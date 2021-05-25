// import {format_minutes} from "../../lib/common";
import {format_minutes} from "./common";
import React from "react";

import MaterialIcon, {colorPalette} from 'material-icons-react';

const checkNotAnsweredCount=(count)=>{
    return count>5 ? 'NotAnswerBadge-many' : 'NotAnswerBadge-few'
}

export const timeTemplate=(data)=>{
    return (
        <>
            <span className="p-column-title">Время</span>
            <span className={`AgentBadgeDump ${ data.agentdump_num>0 && ('AgentBadgeDump-p')  }`}>{data.agentdump_num}</span>
            {data.time.slice(11)}
        </>
    )
}

export const phoneTemplate=(data)=>{
    return (
        <>
            <span className={'p-column-title'}>Телефон</span>
            <span>{data.phone}</span>
        </>
    )
}

export const queuenameTemplate=(data)=>{
    return (
        <>
            <span className={'p-column-title'}>Очередь</span>
            <span>{data.queuename}</span>
        </>
    )
}

export const posTemplate=(data)=>{
    return (
        <>
            <span className={'p-column-title'}>Начальная позиция</span>
            {data.pos}
        </>
    )
}

export const inputPhoneTemplate=(data)=>{
    return (
        <>
            <span className={'p-column-title'}>Входной номер</span>
            {data.input_phone}
        </>
    )
}

export const agentTemplate=(data)=>{
    return (
        <>
            <span className={'p-column-title'}>Оператор</span>
            {data.agent}
        </>
    )
}

export const waitTemplate=(data)=>{
    return (
        <>
            <span className={'p-column-title'}>Время ожидания</span>
            { data.notanswer_num && (<span className={`NotAnswerBadge ${checkNotAnsweredCount(data.notanswer_num)}`}>{data.notanswer_num}</span>) }
            <span>{format_minutes(data.wait)} </span>
        </>
    )
}

export const calltimeTemplate=(data)=>{
    return (
        <>
            <span className={'p-column-title'}>Время разговора</span>
            <span className={data.calltime<=15 && ("SpeedTalk")} >{format_minutes(data.calltime)}</span>
        </>
    )
}

export const callDuration=(data)=>{
    return (
        <>
            <span className={'p-column-title'}>Длительность</span>
            <span className={data.duration<=15 && ("SpeedTalk")}>{format_minutes(data.duration)}</span>
        </>
    )
}

const getImageForCall=(code)=>{
    let icon='';
    switch (Number(code)) {
        case 0:
            icon="call_made"
            break
        case 1:
            icon="call"
            break
        case 2:
            icon="call_missed"
            break
        case 3:
            icon="call_end"
            break
        case 4:
            icon="call_end"
            break
    }
    return icon
}

export const callResultTemplate=(data)=>{
    return (
        <>
            <span className={'p-column-title'}>Статус звонка</span>
            {/*<CallRoundedIcon/>*/}
            {/*{data.res_code}*/}
            {/*<MaterialIcon icon={`${data.res_code}`} color={colorPalette.amber.A700} />*/}

            { data.res_code==="call_end_op" && (<MaterialIcon icon='call_end' color={colorPalette.amber.A700} />) }
            { data.res_code==="call_end_a" && (<MaterialIcon icon='call_end' color={colorPalette.green.A400} />) }
            { data.res_code==="call_missed" && (<MaterialIcon icon='call_missed' color={colorPalette.red.A400} />) }
            { data.res_code==="call" && (<MaterialIcon icon='call' color={colorPalette.green.A700} />) }
            { data.res_code==="call_made" && (<MaterialIcon icon='call_made' color={colorPalette.blue.A400} />) }
            {data.d_type}
        </>
    )
}

export const callEventTemplate=(data)=>{
    return (
        <>
            <span className={'p-column-title'}>Событие</span>
            { data.event==="CONNECT" &&(<MaterialIcon icon={'call'} color={colorPalette.green.A700} />) }
            { data.event==="RINGNOANSWER" &&(<MaterialIcon icon={'call_missed'} color={colorPalette.red.A400}/>)}
            { data.event==="RINGCANCELED" &&(<MaterialIcon icon={'close'} color={colorPalette.deepOrange.A700}/>)}
        </>
    )
}