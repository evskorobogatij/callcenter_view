import {format_minutes} from "../../lib/common";
import React from "react";

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
            <span>{format_minutes(data.calltime)}</span>
        </>
    )
}

export const callResultTemplate=(data)=>{
    return (
        <>
            <span className={'p-column-title'}>Статус звонка</span>
            {data.d_type}
        </>
    )
}