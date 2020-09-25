import React from "react";
import {Card} from "primereact/card";

import "./CardCallEnd.scss"

function CardCallEnd(props) {
    return (
        <Card title={"Кто положил трубку?"} >
            <div className={"CardCallEnd-textBlock"}
                 style={{paddingBottom:'16px'}}
            >
                <div>Операторы</div>
                <div>Абоненты</div>
            </div>

            <div className={"CardCallEnd-textBlock"} >
                <div className={'CardCallEnd-textBlock_vales'}>{props.operator}</div>
                <div className={'CardCallEnd-textBlock_vales'}>{props.caller}</div>
            </div>

            <div className={"CardCallEnd-bar"}>
                <div className={"CardCallEnd-bar_left"} style={{width: `${Number(props.operator)/(Number(props.operator)+Number(props.caller))*100}%`}} />
                <div className={"CardCallEnd-bar_right"} style={{width:`${Number(props.caller)/(Number(props.operator)+Number(props.caller))*100}%`}} />
            </div>
        </Card>
    )
}

export default CardCallEnd;