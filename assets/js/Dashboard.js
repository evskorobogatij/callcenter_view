import React from 'react';
import ReactDOM from 'react-dom';

import moment from 'moment';

// import {} from "./components/Card/Card"
import {Card as TelCard} from "./components/Card/Card";

import {Card} from 'primereact/card'

export default function Dashboard(props) {

    const [callsStatus,setCallsStatus] = React.useState({
        calls : 0,
        answered_calls: 0,
        abandon: 0,
        rejected_calls: 0
    });

    console.log(props)
    const s = "ddd"

    React.useEffect(()=>{
        console.log('date changed',props.date)
        // console.log(props.date.toISOString())

        let s_date = moment(props.date).format("YYYY-MM-DD");
        console.log(s_date)
        fetch(`/api/calls_summary/${s_date}`).then(response => response.json()).then(result => setCallsStatus(result))
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


            </div>

        </>
    )
}

