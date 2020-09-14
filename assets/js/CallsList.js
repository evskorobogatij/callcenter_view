import React from 'react';

import { DataTable } from 'primereact/datatable'
import {Column} from "primereact/column";
import moment from "moment";
import {Dropdown} from "primereact/dropdown";

import {format_minutes} from './lib/common'

export default function CallsList(props) {

    const [callList, setCallList] = React.useState([])

    const [selectedStatus,setSelectedStatus] = React.useState('')
    const statuses = [
        'Оператор положил трубку',
        'Абонент положил трубку',
        'Пропушеный вызов'
    ]

    React.useEffect(()=>{
        let s_date = moment(props.date).format("YYYY-MM-DD");
        console.log(s_date)
        fetch(`/api/calls_list/${s_date}`).then(response => response.json()).then(result=>setCallList(result))
    },[props.date])

    const rowClicked = (e) => {
        console.log(e)
    }

    // const statusFilter = <Dropdown value={this.state.selectedStatus} options={this.statuses} onChange={(e) => this.setState({ selectedStatus: e.value })} itemTemplate={this.statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;


    const resultFilter = <Dropdown value={selectedStatus} options={statuses} onChange={e => setSelectedStatus(e.value)} className="p-column-filter" />

    const waitTemplate=(data)=>{
        return (
            <>
                <span>{format_minutes(data.wait)} </span>
            </>
        )
    }

    const calltimeTemplate=(data)=>{
        return (
            <>
                <span>{format_minutes(data.calltime)}</span>
            </>
        )
    }

    return (
        <>
            <h1>Список звонков</h1>
            <DataTable value={callList}
                       selectionMode="single"
                       onRowClick={e => rowClicked(e)}
                       dataKey={'callid'}
                       scrollable scrollHeight="80vh"
                       className="p-datatable-striped"
            >
                <Column field={'time'} header={'Время'} />
                <Column field={'phone'} header={'Телефон'} />
                <Column field={'queuename'} header={'Очередь'} />
                <Column field={'pos'} header={'Позиция'} />
                <Column field={'input_phone'} header={'Входной номер'} />
                <Column field={'agent'} header={'Оператор'} />
                <Column field={'wait'} header={'Ожидание'} body={waitTemplate} />
                <Column field={'calltime'} header={'Разговор'} body={calltimeTemplate} />
                <Column field={'d_type'} header={'Результат звонка'}
                        // filter
                        // filterElement={resultFilter}
                />
            </DataTable>

        </>
    )
}