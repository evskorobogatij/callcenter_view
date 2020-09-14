import React from "react";

import "./Card.scss"

function Card(props) {

    return (
        <div className={'Card'}>
            <div className={'Card-title'}>{props.title}</div>
            <div className={'Card-detail'}>{props.detail}</div>
            <div className={`Card-count Calls-${props.call_type}`}>{props.count}</div>
        </div>
    )
}

export {Card} ;