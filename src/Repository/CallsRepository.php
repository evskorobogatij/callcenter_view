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
            where 
                date_format(input_call.time,'%Y-%m-%d')=? 
                and input_call.event='DID'
            
            order by input_call.time desc   ";

        $t = $this->conn->fetchAll($str,[$date]);
        return $t;
    }

    function not_answer($date){
        $str = "select agent, count(1) count  from  queue_log where date_format(time,'%Y-%m-%d')=? and event='RINGNOANSWER' group by agent ";
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

        $data = [
            'calls' => $did['cn'],
            'answered_calls' => $answered_calls['cn'],
            'abandon' => $abandon['cn'],
            'rejected_calls' => $rejected_calls['cn'],
            'not_aswered' => $not_aswered['cn'],
            'mid_wait_time' => $mid_wait_time['val'],
            'max_wait_time' => $max_wait_time['val'],
            'mid_call_time' => $mid_call_time['val']
        ];

        return $data;
    }

}