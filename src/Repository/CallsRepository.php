<?php


namespace App\Repository;

use Doctrine\DBAL\Connection;
use Doctrine\Persistence\ManagerRegistry;

class CallsRepository
{
    /**
     * @var Connection
     */
    private $conn;

    public function __construct(ManagerRegistry $registry)
    {
        $this->conn = $registry->getConnection();
    }

    function calls_list($date){
        $str = "      
             SELECT
                agentdump.num as agentdump_num,
                notawnser.count as notanswer_num,
                input_call.time, input_call.callid, 
                enter.data2 as phone,
                input_call.queuename, input_call.data1 as input_phone,
                 enter.data3 as pos,
                CASE
                    WHEN c_agent.data1 is not null then 'Оператор положил трубку'
                    WHEN c_caller.data1 is not null then 'Абонент положил трубку'
                    WHEN abandon.data1 is not null then 'Пропушеный вызов'
                    WHEN c_agent.data1 is null 
                        and c_caller.data1 is null
                        and abandon.data1 is null 
                        and t_connect.data1 is null 
                        then 'Звонок'
                    WHEN c_agent.data1 is null 
                        and c_caller.data1 is null
                        and abandon.data1 is null 
                        and t_connect.data1 is not null 
                        then 'Активный разговор'    
                end as d_type,
                    
               CASE
                    WHEN c_agent.data1 is not null then 'call_end_op'
                    WHEN c_caller.data1 is not null then 'call_end_a'
                    WHEN abandon.data1 is not null then 'call_missed'
                    WHEN c_agent.data1 is null 
                        and c_caller.data1 is null
                        and abandon.data1 is null 
                        and t_connect.data1 is null 
                        then 'call_made'
                    WHEN c_agent.data1 is null 
                        and c_caller.data1 is null
                        and abandon.data1 is null 
                        and t_connect.data1 is not null 
                        then 'call'    
                end as res_code,
               
                t_connect.agent, 
                -- COALESCE(c_agent.agent,c_caller.agent) as c_agent,
                -- COALESCE(c_agent.data1, c_caller.data1) as hold_time, 
            
                -- t_connect.data1 as hold_time1,
                --  abandon.data3 as wait_time,
            
                 COALESCE(t_connect.data1, abandon.data3) as wait,
                COALESCE(c_agent.data2, c_caller.data2) as calltime
                
            FROM queue_log as input_call
            LEFT JOIN queue_log as enter on(enter.callid=input_call.callid 
                        -- and date_format(enter.time,'%Y-%m-%d')='2020-09-09' 
                                         and enter.event='ENTERQUEUE')
            LEFT JOIN queue_log as t_connect on(t_connect.callid=input_call.callid
                                                and t_connect.event='CONNECT'
                                               )
            LEFT JOIN queue_log as abandon on(abandon.callid=input_call.callid
                                            and abandon.event='ABANDON')
            LEFT JOIN queue_log as c_agent on(c_agent.callid=input_call.callid 
                        -- and date_format(c_agent.time,'%Y-%m-%d')='2020-09-09' 
                                         and c_agent.event='COMPLETEAGENT')
            LEFT JOIN queue_log as c_caller on(c_caller.callid=input_call.callid 
                        -- and date_format(c_caller.time,'%Y-%m-%d')='2020-09-09' 
                                         and c_caller.event='COMPLETECALLER')    
            
            LEFT JOIN (select callid, count(1) as num
                    from  queue_log where  event='AGENTDUMP' 
                    group by callid ) as agentdump on (agentdump.callid=input_call.callid)
            LEFT JOIN (
                    select callid, count(1) count  
                    from  queue_log where event='RINGNOANSWER' 
                    group by callid ) as notawnser on (notawnser.callid=input_call.callid)
            where 
                date_format(input_call.time,'%Y-%m-%d')=? 
                and input_call.event='DID'
            
            order by input_call.time desc   ";

        $t = $this->conn->fetchAll($str,[$date]);
        return $t;
    }

    function agent_work($date,string $agent){
        $str = "SELECT enter.data2 as phone, input_call.time, input_call.event, 
                end_call.event event_end, end_call.data1 as wait, end_call.data2 as duration  /*input_call.* */
             FROM asteriskcdrdb.queue_log as input_call
            LEFT JOIN queue_log as enter on(enter.callid=input_call.callid 
                                         and enter.event='ENTERQUEUE')                             
            LEFT JOIN queue_log as end_call on (end_call.callid=input_call.callid  and input_call.event='CONNECT' and end_call.event in ('COMPLETEAGENT','COMPLETECALLER') )
            where input_call.agent=? and date_format(input_call.time,'%Y-%m-%d')=?							
            and input_call.event in ( 'RINGNOANSWER','CONNECT','RINGCANCELED')
            order by input_call.time";

        $data = $this->conn->fetchAll($str,[$agent,$date]);
        return $data;
    }

    function not_answer($date){
        $str = "select agent, count(1) count  from  queue_log where date_format(time,'%Y-%m-%d')=? and event='RINGNOANSWER' group by agent ";
        $d = $this->conn->fetchAll($str,[$date]);
        return $d;
    }

    function work_state($date){
        $str = "select agent, count(1) count  from  queue_log where date_format(time,'%Y-%m-%d')=? and event='CONNECT' group by agent ";
        $d = $this->conn->fetchAll($str,[$date]);
        return $d;
    }

    function calls_summary($date){
        $did = $this->conn->fetchAssoc("select count(1) cn  from  queue_log 
                                            where date_format(time,'%Y-%m-%d')=? and event='DID' ",[$date]);
        $answered_calls = $this->conn->fetchAssoc("select count(1) cn  from  queue_log 
                                                        where date_format(time,'%Y-%m-%d')=? and event='CONNECT'",[$date]);

        $abandon = $this->conn->fetchAssoc("select count(1) cn  from  queue_log         
                                                where date_format(time,'%Y-%m-%d')=? and event='ABANDON'",[$date]);

        $rejected_calls = $this->conn->fetchAssoc("select count(1) cn  from  queue_log 
                                                        where date_format(time,'%Y-%m-%d')=? and event='AGENTDUMP'",[$date]);

        $not_aswered  = $this->conn->fetchAssoc("select count(1) cn  from  queue_log 
                                                      where date_format(time,'%Y-%m-%d')=? and event='RINGNOANSWER'",[$date]);
//        $mid_wait_time = $this->conn->fetchAssoc("select sum(convert(data1,int))/count(1) as val
//                                                       from  queue_log
//                                                       where date_format(time,'%Y-%m-%d')=? and event='CONNECT'",[$date]);

        $mid_wait_time = $this->conn->fetchAssoc(" SELECT
                                                         round( sum(convert(COALESCE(t_connect.data1, abandon.data3),int))/count(1) , 1) as val
                                                    FROM queue_log as input_call
                                                    LEFT JOIN queue_log as t_connect on(t_connect.callid=input_call.callid
                                                                                        and t_connect.event='CONNECT' )
                                                    LEFT JOIN queue_log as abandon on(abandon.callid=input_call.callid
                                                                                    and abandon.event='ABANDON')
                                                    where 
                                                        date_format(input_call.time,'%Y-%m-%d')=? and input_call.event='DID'  ", [$date]);

//        $max_wait_time = $this->conn->fetchAssoc("select max(convert(data1,int)) as val  from  queue_log
//                                                       where date_format(time,'%Y-%m-%d')=? and event='CONNECT'",[$date]);
        $max_wait_time  = $this->conn->fetchAssoc(" SELECT
                                                         max(convert(COALESCE(t_connect.data1, abandon.data3),int)) as val
                                                    FROM queue_log as input_call
                                                    LEFT JOIN queue_log as t_connect on(t_connect.callid=input_call.callid
                                                                                        and t_connect.event='CONNECT' )
                                                    LEFT JOIN queue_log as abandon on(abandon.callid=input_call.callid
                                                                                    and abandon.event='ABANDON')
                                                    where 
                                                        date_format(input_call.time,'%Y-%m-%d')=? and input_call.event='DID' ",[$date]);

        $mid_call_time = $this->conn->fetchAssoc("select round( sum(convert(data2,int))/count(1) , 1) as val from  queue_log 
                                                      where date_format(time,'%Y-%m-%d')=? 
                                                      and event in ('COMPLETEAGENT','COMPLETECALLER' ) ",[$date]);

        $operator_compliate = $this->conn->fetchAssoc("select count(1) cn  from  queue_log 
                                            where date_format(time,'%Y-%m-%d')=? and event='COMPLETEAGENT' ",[$date]);
        $caller_compliate = $this->conn->fetchAssoc("select count(1) cn  from  queue_log 
                                            where date_format(time,'%Y-%m-%d')=? and event='COMPLETECALLER' ",[$date]);

        $data = [
            'calls' => $did['cn'],
            'answered_calls' => $answered_calls['cn'],
            'abandon' => $abandon['cn'],
            'rejected_calls' => $rejected_calls['cn'],
            'not_aswered' => $not_aswered['cn'],
            'mid_wait_time' => $mid_wait_time['val'],
            'max_wait_time' => $max_wait_time['val'],
            'mid_call_time' => $mid_call_time['val'],
            'operator_compliate' => $operator_compliate['cn'],
            'caller_compliate' => $caller_compliate['cn']
        ];

        return $data;
    }

    function agents(){
        $str = "select distinct agent from  queue_log where event='CONNECT';";
        $tmp = $this->conn->fetchAll($str);
        $data = [];
        foreach ($tmp as $item){
            $data[] = $item['agent'];
        }
        return $data;
    }

    function day_distribution($date){
        $str="select convert(date_format(time,'%H'),int) as hour  , count(1) count
        from  queue_log where date_format(time,'%Y-%m-%d')=? and event='DID'
        group by hour
        order by hour;";
        $d = $this->conn->fetchAll($str,[$date]);
        return $d;
    }

    function call_detail($call){
        $str= "select time, agent, event, data1, data2, data3 
               from  queue_log 
               where event!='DID' and callid=? ";
        $data = $this->conn->fetchAll($str,[$call]);
        return $data;
    }

    function did_log(){
        $str = "select date_format(time,'%Y-%m-%d') as dt, count(1) cn from queue_log 
                 where event='DID' 
                group by dt
                order by dt desc
                limit 30";
        $data = $this->conn->fetchAll($str);
        return $data;
    }

    function answered_calls_log(){
        $str="select date_format(time,'%Y-%m-%d') as dt, count(1) cn from queue_log 
                 where event='CONNECT' 
                group by dt
                order by dt desc
                limit 30";
        $data = $this->conn->fetchAll($str);
        return $data;
    }

    function abandon_calls_log(){
        $str="select date_format(time,'%Y-%m-%d') as dt, count(1) cn from queue_log 
                 where event='ABANDON' 
                group by dt
                order by dt desc
                limit 30";
        $data = $this->conn->fetchAll($str);
        return $data;
    }

    function rejected_calls_log(){
        $str="select date_format(time,'%Y-%m-%d') as dt, count(1) cn from queue_log 
                 where event='AGENTDUMP' 
                group by dt
                order by dt desc
                limit 30";
        $data = $this->conn->fetchAll($str);
        return $data;
    }
}