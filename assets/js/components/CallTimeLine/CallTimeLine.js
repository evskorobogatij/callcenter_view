import React from "react";

import './TileLine.scss'

function CallTimeLine(props) {
    return (
        <ul className={'TimeLine'}>
            {
                props.callData.map((call,index)=>{
                    console.log(call);

                    return (
                            <li className={'TimeLineItem'}>
                                <div className={'TimeLineItem-timeBlock'}>
                                    <p className={'TimeLineItem-timeBlock_time'}>{call.time.slice(11)}</p>
                                </div>
                                <div className={'TimeLineSeparator'}>
                                    <span className={'TimeLineSeparator-dot'} />
                                    { index !== props.callData.length - 1 && (<span className={'TimeLineSeparator-line'} />)}
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
