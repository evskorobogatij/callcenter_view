import React from "react";
import {Card} from "primereact/card";

import "./CardCallEnd.scss"
import AnimatedNumber from "animated-number-react";

function CardCallEnd(props) {

    const formatValue = value => `${Number(value).toFixed(0)}`;

    return (
        <Card title={"Кто положил трубку?"} >
            <div className={"CardCallEnd-textBlock"}
                 style={{paddingBottom:'16px'}}
            >
                <div>Операторы</div>
                <div>Абоненты</div>
            </div>

            <div className={"CardCallEnd-textBlock"} >
                <div className={'CardCallEnd-textBlock_vales'}>
                    <AnimatedNumber
                        value={props.operator}
                        formatValue={formatValue}
                        duration={900}
                    />
                </div>
                <div className={'CardCallEnd-textBlock_vales'}>
                    <AnimatedNumber
                        value = {props.caller}
                        formatValue={formatValue}
                        duration={900}
                    />

                </div>
            </div>

            <div className={"CardCallEnd-bar"}>
                <div className={"CardCallEnd-bar_left"} style={{width: `${Number(props.operator)/(Number(props.operator)+Number(props.caller))*100}%`}} />
                <div className={"CardCallEnd-bar_right"} style={{width:`${Number(props.caller)/(Number(props.operator)+Number(props.caller))*100}%`}} />
            </div>
        </Card>
    )
}

export default CardCallEnd;