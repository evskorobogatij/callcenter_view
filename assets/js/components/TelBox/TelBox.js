import React from "react";

import "./TelBox.scss"

function TelBox(props) {

    return (
        <div className={'TelBox'}>
            <div className={'TelBox-info'}>
                <span className={'TelBox-info_text'}>{props.title}</span>
            </div>
            <div className={'TelBox-value'}>
                <span className={"TelBox-value_text"} >{props.value}</span>
            </div>
        </div>
    )
}

export {TelBox}