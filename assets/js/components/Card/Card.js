import React from "react";
import AnimatedNumber from "animated-number-react";

import "./Card.scss"

function Card(props) {

    const formatValue = value => `${Number(value).toFixed(0)}`;

    return (
        <div className={'Card'}>
            <div className={'Card-title'}>{props.title}</div>
            <div className={'Card-detail'}>{props.detail}</div>
            <div className={`Card-count Calls-${props.call_type}`}>
                {
                    props.noanimate ? (<>{props.count}</>)
                        :(<AnimatedNumber
                            value={props.count}
                            formatValue={formatValue}
                            duration={900}
                        />)
                }


            </div>
        </div>
    )
}

export {Card} ;