import React from 'react'
import {Toolbar} from 'primereact/toolbar'
import {Button} from "primereact/button";

import {Calendar} from "primereact/calendar";

import "./AppToolbar.scss"

function AppToolbar(props) {

    // const [date, setDate] = React.useState(props.date)

    const curDate = new Date();
    const d = curDate.toISOString().slice(0,10);
    const ru = {
        firstDayOfWeek: 1,
        dayNames: ["понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "Воскресенье"],
        dayNamesShort: ["Вс","Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        dayNamesMin: [ "Вс","Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        monthNames: ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октюбрь", "ноябрь", "декабрь"],
        monthNamesShort: ["янв", "фев", "мар", "апр", "май", "ин", "ил", "авг", "сен", "окт", "ноя", "дек"],
        today: "Сегодня",
        clear: "Очистить"
    };


    const dateChanged = (e) => {
        console.log(e.value)
        props.setDate(e.value)
    }

    const leftContents = (
        <>
            <Button icon="pi pi-bars" id="toggleMenu" />
            {/*<Button label="New" icon="pi pi-plus" className="p-mr-2" />*/}
            {/*<Button label="Upload" icon="pi pi-upload" className="p-button-success" />*/}
            <span className={'AppToolbar-title'}>Мониторинг звонков</span>
        </>
    );

    const rightContents = (
        <>
            <Calendar locale={ru} dateFormat={'dd.mm.yy'} value={props.date} maxDate={curDate} onChange={dateChanged} showIcon ></Calendar>
        </>
    );
    return(
        <Toolbar left={leftContents} right={rightContents} />
    )
}

export default AppToolbar;