import React, {useRef} from 'react'
import {Toolbar} from 'primereact/toolbar'
import {Button} from "primereact/button";

import {Calendar} from "primereact/calendar";
import {Menu} from "primereact/menu";
import {ru} from "../../lib/calendar_names";

import "./AppToolbar.scss"

function AppToolbar(props) {

    // const [date, setDate] = React.useState(props.date)
    const navMenu = useRef()

    const curDate = new Date();
    const d = curDate.toISOString().slice(0,10);

    const dateChanged = (e) => {
        console.log(e.value)
        props.setDate(e.value)
    }

    const menu_items = [
        {
            label:'Панель',
            icon: 'pi pi-home',
            command:(e)=>{
                window.location.hash = "/"
            }
        },
        {
            label:'Список звонков',
            icon:'pi pi-table',
            command:(e)=>{
                window.location.hash = "/calls_list"
            }
        }
    ]


    const leftContents = (
        <>
            <Button icon="pi pi-bars" id="toggleMenu" onClick={(event)=>navMenu.current.toggle(event)} />
            <Menu popup id={"popup_menu"} model={menu_items} ref={navMenu} />
            <span className={'AppToolbar-title'}>Мониторинг звонков</span>
        </>
    );

    const rightContents = (
        <>
            <Calendar locale={ru} dateFormat={'dd.mm.yy'} value={props.date} maxDate={curDate} onChange={dateChanged} showIcon ></Calendar>
        </>
    );
    return(
        <Toolbar className={"AppToolbar"} left={leftContents} right={rightContents} />
    )
}

export default AppToolbar;