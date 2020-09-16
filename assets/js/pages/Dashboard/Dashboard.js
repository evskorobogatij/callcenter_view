import React from 'react';
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


export default function Dashboard(props) {

    const [callsStatus,setCallsStatus] = React.useState({
        calls : 0,
        answered_calls: 0,
        abandon: 0,
        rejected_calls: 0,
        not_aswered: 0,
        mid_wait_time: 0,
        mid_call_time: 0,
        max_wait_time: 0

    });

    const [notAnswerAgents,setNotAnsweredAgents] = React.useState([])

    const [timer,setTimer] = React.useState(null)

    console.log(props)
    const s = "ddd"

    const getCallsData = () => {
        let s_date = moment(props.date).format("YYYY-MM-DD");
        console.log(s_date)
        fetch(`/api/calls_summary/${s_date}`).then(response => response.json()).then(result => setCallsStatus(result))
        fetch(`/api/not_answer_agents/${s_date}`).then(response => response.json()).then(result =>setNotAnsweredAgents(result))
    }

    React.useEffect(()=>{
        let s_date = moment(props.date).format("YYYY-MM-DD");
        let c_date = moment().format("YYYY-MM-DD");
        if (s_date===c_date)
            setTimer(setInterval(getCallsData,5000))
        else
            clearInterval(timer)

        getCallsData()
    },[props.date])

    React.useEffect(()=>{
        console.log(callsStatus)
    },[callsStatus])

    return (
        <>
            <h1>Панель управления</h1>
            {/*<p>данные на {props.date.toISOString().slice(0,10)} </p>*/}
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-md-6 p-lg-3">
                    <TelCard title={"Звонки"} detail={"Количество поступивших звонков"} call_type={'incomming'} count={callsStatus.calls} />
                </div>
                <div className="p-col-12 p-md-6 p-lg-3">
                    <TelCard title={"Обработано"} detail={"Обработаные звонки"} call_type={'answered'} count={callsStatus.answered_calls}/>
                </div>
                <div className="p-col-12 p-md-6 p-lg-3">
                    <TelCard title={"Пропущено"} detail={"Пропущеные звонки"} call_type={'notanswered'} count={callsStatus.abandon}/>
                </div>
                <div className="p-col-12 p-md-6 p-lg-3">
                    <TelCard title={"Отклонено"} detail={"Оператор отклонил звонок"} call_type={'abandon'} count={callsStatus.rejected_calls}/>
                </div>

                <div className="p-col-12 p-lg-6">
                    <Card title={"Неотвечающие операторы"} >
                        <DataTable
                            value={notAnswerAgents}
                            // header={"Список неотвечающих опереторов"}
                            removableSort
                        >
                            <Column field={'agent'} header={'Оператор'} />
                            <Column field={'count'} header={'Кол-во'} sortable />
                        </DataTable>
                    </Card>
                </div>

                <div className="p-col p-fluid sub-box" >
                    <div className="p-col-12 p-md-6 p-lg-6">
                        <TelBox title={"Не отвечено звонков"} value={callsStatus.not_aswered} />
                    </div>
                    <div className="p-col-12 p-md-6 p-lg-6">
                        <TelBox title={"Среднее время ожидания"} value={format_minutes(callsStatus.mid_wait_time)} />
                    </div>

                    <div className="p-col-12 p-md-6 p-lg-6">
                        <TelBox title={"Среднее время разговора"} value={format_minutes(callsStatus.mid_call_time)} />
                    </div>

                    <div className="p-col-12 p-md-6 p-lg-6">
                        <TelBox title={"Максимальное время ожидания"}  value={format_minutes(callsStatus.max_wait_time)} />
                    </div>
                </div>


            </div>

        </>
    )
}

