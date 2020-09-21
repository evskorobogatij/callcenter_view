import React from "react";

import './TileLine.scss';


const IconRinging = ({color="#007be5"}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill={color} height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 6c0 .56.45 1 1 1h5.59L4.7 17.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L17 8.41V14c0 .55.45 1 1 1s1-.45 1-1V6c0-.55-.45-1-1-1h-8c-.55 0-1 .45-1 1z"/></svg>
    )
}

{/*<svg xmlns="http://www.w3.org/2000/svg" fill={color} height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z"/></svg>*/}

const IconInCall = ({color="#007be5"}) => {
    return (
            <svg xmlns="http://www.w3.org/2000/svg" fill={color} height="24" viewBox="0 0 24 24" width="24">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M12.88 5.05c3.18.4 5.67 2.89 6.07 6.07.06.51.49.88.99.88.04 0 .08 0 .12-.01.55-.07.94-.57.87-1.12-.51-4.09-3.72-7.3-7.81-7.81-.55-.06-1.05.33-1.11.88-.07.55.32 1.05.87 1.11zm.38 2.11c-.53-.14-1.08.18-1.22.72s.18 1.08.72 1.22c1.05.27 1.87 1.09 2.15 2.15.12.45.52.75.97.75.08 0 .17-.01.25-.03.53-.14.85-.69.72-1.22-.47-1.77-1.84-3.14-3.59-3.59zm5.97 8.1l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z"/></svg>
        )
}

const IconRindMissed = ({color="#007be5"})=>{

    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill={color} height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M23.09 16.2c-6.33-5.59-15.86-5.59-22.18 0-.84.74-.84 2.05-.05 2.84l1.2 1.2c.71.71 1.84.77 2.62.15l1.97-1.57c.47-.37.75-.94.75-1.55V14.7c2.98-.97 6.21-.98 9.2 0v2.58c0 .6.28 1.17.75 1.55l1.96 1.56c.79.62 1.91.56 2.62-.15l1.2-1.2c.8-.79.79-2.1-.04-2.84zM6 9c.55 0 1-.45 1-1V6.43l4.24 4.24c.39.39 1.02.39 1.41 0l5.66-5.66c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0l-4.95 4.95L8.4 5H10c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1z"/>
        </svg>
    )
}

const IconCallDone = ({color="#007be5"}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill={color} height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z"/></svg>
    )
}

const IconCallCancel=({color="#007be5"})=>{
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill={color} height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg>
    )
}

const IconAgentDump=({color="#007be5"})=>{
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill={color} enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"/><g><g><path d="M14.54,17.37c-2.63,2.08-5.89,3.39-9.45,3.61c-1.13,0.07-2.07-0.87-2.07-2v-1.73 c-0.01-1.01,0.75-1.86,1.76-1.98l2.54-0.29c0.61-0.07,1.21,0.14,1.64,0.57l1.84,1.84c0.81-0.41,1.59-0.9,2.31-1.45L2.1,4.93 c-0.39-0.39-0.39-1.02,0-1.41l0,0c0.39-0.39,1.03-0.39,1.42,0L20.49,20.5c0.39,0.39,0.39,1.02,0,1.41s-1.02,0.39-1.41,0 L14.54,17.37z M17.39,10.8l-1.85-1.85c-0.43-0.43-0.64-1.03-0.57-1.64l0.29-2.52c0.12-1.01,0.97-1.77,1.99-1.77h1.73 c1.13,0,2.07,0.94,2,2.07c-0.22,3.57-1.54,6.83-3.62,9.47l-1.43-1.43C16.48,12.4,16.97,11.62,17.39,10.8z"/></g></g></svg>
    )
}

const  checkDotType=(event)=>{
    let res='';
    console.log('EVENT===',event)
    if ((event==='RINGNOANSWER') || (event==='ABANDON') || (event==='RINGCANCELED') ||(event==='AGENTDUMP') ) {
        res='dot-missed'
    } else if ( (event==='COMPLETEAGENT') || (event==='COMPLETECALLER') ){
        res='dot-success-end'
    }
    return res;
}

const checkLineType=(event)=>{
    return ((event==='RINGNOANSWER') || (event==='ABANDON') || (event==='RINGCANCELED') ||(event==='AGENTDUMP') ) ? 'line-missed' : ''
}

function CallTimeLine(props) {
    return (
        <ul className={'TimeLine'}>
            {
                props.callData.map((call,index)=>{
                    console.log(call);

                    return (
                            <li className={'TimeLineItem'} key={index}>
                                <div className={'TimeLineItem-timeBlock'}>
                                    <p className={'TimeLineItem-timeBlock_time'}>{call.time.slice(11)}</p>
                                </div>
                                <div className={'TimeLineSeparator'}>
                                    <span className={`TimeLineSeparator-dot ${checkDotType(call.event)}`} >

                                        {call.event==='ENTERQUEUE' && (<IconRinging color={'#fff'} />)}
                                        {call.event==='RINGNOANSWER' && (<IconRindMissed color={'#fff'} />)}
                                        {call.event==='RINGCANCELED' && (<IconCallCancel color={'#fff'} />)}
                                        {call.event==='ABANDON' && (<IconCallCancel color={'#fff'} />)}
                                        {call.event==='AGENTDUMP'&& (<IconAgentDump color={'#fff'} />)}
                                        {call.event==='CONNECT' && (<IconInCall color={'#fff'} />)}
                                        {call.event==='COMPLETEAGENT' && (<IconCallDone color={'#fff'} />)}
                                        {call.event==='COMPLETECALLER' && (<IconCallDone color={'#fff'} />)}

                                    </span>
                                    { index !== props.callData.length - 1 && (<span className={`TimeLineSeparator-line ${checkLineType(call.event)}`} />)}
                                </div>
                                <div className={'TimeLineItem-dataBlock'}>
                                    <div className={'TimeLineItem-dataBlock_content'}>
                                            {call.event==='ENTERQUEUE' && (<>
                                                <h3 className={'TimeLineItem-dataBlock_title'}>Звонок</h3>
                                                <strong>{call.data2}</strong> начал звонить </>
                                            )}
                                            {call.event==='RINGNOANSWER' && (
                                                <>
                                                    <h3 className={'TimeLineItem-dataBlock_title'}>Пропущенный звонок</h3>
                                                    Оператор <strong>{call.agent}</strong> пропустил звонок
                                                </>
                                            ) }
                                            {call.event==='RINGCANCELED' && (
                                                <>
                                                    <h3 className={'TimeLineItem-dataBlock_title'}>Отмена вызова</h3>
                                                    Вызов завершен преждевременно
                                                </>
                                            )}
                                            {call.event==='ABANDON' && (
                                                <>
                                                    <h3 className={'TimeLineItem-dataBlock_title'}>Отмена вызова</h3>
                                                    Человек положит трубку не дозвонившись
                                                </>
                                            )}
                                            {call.event==='AGENTDUMP' && (
                                                <>
                                                    <h3 className={'TimeLineItem-dataBlock_title'}>Сброс</h3>
                                                    Оператор <strong>{call.agent}</strong> сбросил вызов
                                                </>
                                            )}
                                            {call.event==='CONNECT' && (
                                                <>
                                                    <h3 className={'TimeLineItem-dataBlock_title'}>Разговор</h3>
                                                    Оператор <strong>{call.agent}</strong> ответил на звонок
                                                </>
                                            )}
                                            {call.event==='COMPLETEAGENT' && (
                                                <>
                                                    <h3 className={'TimeLineItem-dataBlock_title'}>Завершение вызова</h3>
                                                    Оператор положил трубку
                                                </>
                                            )}
                                            {call.event==='COMPLETECALLER' && (
                                                <>
                                                    <h3 className={'TimeLineItem-dataBlock_title'}>Завершение вызова</h3>
                                                    Человек положил трубку
                                                </>
                                            )}
                                    </div>
                                </div>
                            </li>
                        )

                })
            }
        </ul>
    )
}

export {CallTimeLine}
