import React, {useRef} from 'react';
import ReactDOM from 'react-dom';

import moment from 'moment';

// import {} from "./components/Card/Card"
import {Card as TelCard} from "../../components/Card/Card";
import {TelBox} from "../../components/TelBox/TelBox";

import {Card} from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import {Column} from "primereact/column";

import {format_minutes} from '../../lib/common'

import './Dashboard.scss';
import CardCalsDistribution from "../../cards/CardCallsDistribution";
import CardCallEnd from "../../cards/CardCallsEnd/CardCallEnd";
import {Link} from "react-router-dom";


export default function Dashboard(props) {

    const [callsStatus,setCallsStatus] = React.useState({
        calls : 0,
        answered_calls: 0,
        abandon: 0,
        rejected_calls: 0,
        not_aswered: 0,
        mid_wait_time: 0,
        mid_call_time: 0,
        max_wait_time: 0,
        operator_compliate: 0,
        caller_compliate: 0
    });

    const [notAnswerAgents,setNotAnsweredAgents] = React.useState([])
    const [workState, setWorkState] = React.useState([])

    const timerRef = useRef()

    console.log(props)
    const s = "ddd"

    const getCallsData = () => {
        let s_date = moment(props.date).format("YYYY-MM-DD");
        console.log(s_date)
        fetch(`/api/calls_summary/${s_date}`).then(response => response.json()).then(result => setCallsStatus(result))
        fetch(`/api/not_answer_agents/${s_date}`).then(response => response.json()).then(result =>setNotAnsweredAgents(result))
        fetch(`/api/work_state/${s_date}`).then(response => response.json()).then(result=>setWorkState(result))
    }

    React.useEffect(()=>{
        let s_date = moment(props.date).format("YYYY-MM-DD");
        let c_date = moment().format("YYYY-MM-DD");
        if (s_date===c_date) {
            //setTimer(setInterval(getCallsData,5000))
            const v = setInterval(() => getCallsData(), 5000)
            timerRef.current = v
        }
        else
            clearInterval(timerRef.current)

        getCallsData()
        return ()=>{
            clearInterval(timerRef.current)
        }
    },[props.date])

    React.useEffect(()=>{
        console.log(callsStatus)
    },[callsStatus])

    const style={
        a : {
            textDecoration: 'none'
        }
    }
    return (
        <>
            <h1>Панель управления</h1>
            {/*<p>данные на {props.date.toISOString().slice(0,10)} </p>*/}
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-sm-6 p-md-6 p-lg-3">
                    <Link to={"did_log"} style={style.a} >
                        <TelCard title={"Звонки"} detail={"Количество поступивших звонков"} call_type={'incomming'} count={callsStatus.calls} />
                    </Link>
                </div>
                <div className="p-col-12 p-sm-6 p-md-6 p-lg-3">
                    <Link to={"answered_calls_log"} style={style.a}>
                        <TelCard title={"Обработано"} detail={"Обработаные звонки"} call_type={'answered'} count={callsStatus.answered_calls}/>
                    </Link>
                </div>
                <div className="p-col-12 p-sm-6 p-md-6 p-lg-3">
                    <Link to={"abandon_calls_log"} style={style.a} >
                        <TelCard title={"Пропущено"} detail={"Пропущеные звонки"} call_type={'notanswered'} count={callsStatus.abandon}/>
                    </Link>
                </div>
                <div className="p-col-12 p-sm-6 p-md-6 p-lg-3">
                    <Link to={"rejected_calls_log"} style={style.a} >
                        <TelCard title={"Отклонено"} detail={"Оператор отклонил звонок"} call_type={'abandon'} count={callsStatus.rejected_calls}/>
                    </Link>
                </div>

                <div className="p-col-12 p-md-6 p-lg-3">
                    <Card title={"Неотвечающие операторы"} >
                        <DataTable
                            value={notAnswerAgents}
                            removableSort
                        >
                            <Column field={'agent'} header={'Оператор'} />
                            <Column field={'count'} header={'Кол-во'} sortable />
                        </DataTable>
                    </Card>
                </div>

                <div className="p-col-12 p-md-6 p-lg-6">
                    <Card title={"Количество обработанных звонков"} >
                        <DataTable
                            value={workState}
                            removableSort
                        >
                            <Column field={'agent'} header={'Оператор'} />
                            <Column field={'count'} header={'Кол-во'} sortable />
                        </DataTable>
                    </Card>
                </div>

                <div className="p-col p-fluid sub-box p-md-12 p-lg-3" >
                    <div className="p-col-12 p-sm-6 p-md-6 p-lg-12">
                        <TelBox title={"Не отвечено звонков"} value={callsStatus.not_aswered} />
                    </div>
                    <div className="p-col-12 p-sm-6 p-md-6 p-lg-12">
                        <TelBox title={"Среднее время ожидания"} value={format_minutes(callsStatus.mid_wait_time)} />
                    </div>

                    <div className="p-col-12 p-sm-6 p-md-6 p-lg-12">
                        <TelBox title={"Среднее время разговора"} value={format_minutes(callsStatus.mid_call_time)} />
                    </div>

                    <div className="p-col-12 p-sm-6 p-md-6 p-lg-12">
                        <TelBox title={"Максимальное время ожидания"}  value={format_minutes(callsStatus.max_wait_time)} />
                    </div>

                </div>

                <div className="p-col-12 p-lg-6">
                    <CardCalsDistribution date={props.date}/>
                </div>

                <div className="p-col-12 p-sm-12 p-md-6 p-lg-6 p-xl-3 p-xl-offset-3">
                    <CardCallEnd operator={callsStatus.operator_compliate} caller={callsStatus.caller_compliate} />
                </div>

            </div>


        </>
    )
}

