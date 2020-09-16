import React from 'react';

import { DataTable } from 'primereact/datatable'
import {Column} from "primereact/column";
import moment from "moment";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {OverlayPanel} from "primereact/overlaypanel";
import {Checkbox} from "primereact/checkbox";

import {format_minutes} from '../../lib/common'

import './CallsList.scss';


export default function CallsList(props) {

    const [callList, setCallList] = React.useState([])
    const [timer,setTimer] = React.useState(null)

    const [agents,setAgents] = React.useState([]);

    const [selectedStatus,setSelectedStatus] = React.useState('')
    const [selectedAgent, setSelectedAgent] = React.useState('')
    const statuses = [
        'Оператор положил трубку',
        'Абонент положил трубку',
        'Пропушеный вызов'
    ]

    const [dt,setDt] = React.useState(null)
    const [cols,setCols] = React.useState({
        isQueuename:localStorage.getItem('isQueuename') !== 'false',
        isPos:localStorage.getItem('isPos') !== 'false',
        isInputPhone:localStorage.getItem('isInputPhone') !== 'false'
    })
    const [op,setOp] = React.useState(null)
    // fetch("/api/agents").then(response=>response.json()).then(result=>setAgents(result));

    const getCallsList = () => {
        let s_date = moment(props.date).format("YYYY-MM-DD");
        console.log(s_date)
        fetch(`/api/calls_list/${s_date}`).then(response => response.json()).then(result=>setCallList(result))
    }

    React.useEffect(()=>{
        setCallList([])
        let s_date = moment(props.date).format("YYYY-MM-DD");
        let c_date = moment().format("YYYY-MM-DD");
        (s_date===c_date) ?
            setTimer(setInterval(getCallsList,120000))
         :  clearInterval(timer)

        getCallsList()

        fetch("/api/agents").then(response=>response.json()).then(result=>setAgents(result));
    },[props.date])

    React.useEffect(()=>{
        console.log('Выбранные агент :',selectedAgent)
        if(dt)
            dt.filter(selectedAgent,'agent','equals')
    },[selectedAgent])

    React.useEffect(()=>{
        if(dt)
            dt.filter(selectedStatus,'d_type','equals')
    },[selectedStatus])

    const rowClicked = (e) => {
        console.log(e)
    }

    // const statusFilter = <Dropdown value={this.state.selectedStatus} options={this.statuses} onChange={(e) => this.setState({ selectedStatus: e.value })} itemTemplate={this.statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;


    const resultFilter = <Dropdown value={selectedStatus} options={statuses} onChange={e => setSelectedStatus(e.value)} className="p-column-filter" showClear />
    const agentFilter =  <Dropdown value={selectedAgent} options={agents} onChange={e => setSelectedAgent(e.value)} placeholder={'по оператору'} showClear className={"p-column-filter"} autoWidth />

    const waitTemplate=(data)=>{
        return (
            <>
                <span>{format_minutes(data.wait)} </span>
            </>
        )
    }

    const agentDumpTemplate =(data)=>{
        if (data.agentdump_num)
            return (
                <>
                            <span className={'AgentBadgeDump'}>{data.agentdump_num}</span>
                </>
            )
        else {
            return (<></>)
        }
    }

    const checkNotAnsweredCount=(count)=>{
        return count>5 ? 'NotAnswerBadge-many' : 'NotAnswerBadge-few'
    }

    const notAnswerTemplate=(data)=>{
        if(data.notanswer_num)
            return (
                <>
                    <span className={`NotAnswerBadge ${checkNotAnsweredCount(data.notanswer_num)}`}>{data.notanswer_num}</span>
                </>
            )
        else
            return (<></>)
    }

    const calltimeTemplate=(data)=>{
        return (
            <>
                <span>{format_minutes(data.calltime)}</span>
            </>
        )
    }

    const timeTemplate=(data)=>{
        return (
            <>
                <span>{data.time.slice(11)}</span>
            </>
        )
    }

    const exportData=()=>{
        dt.exportCSV()
    }

    const header = <div style={{textAlign:'right'}}>
                        <Button type={"button"} icon={"pi pi-save"} label={"Экспорт"} onClick={exportData} />
                        <Button type="button" icon="pi pi-cog" label="Опции" onClick={(e)=>op.toggle(e)} ></Button>
                   </div>;

    const handleColumnConfig=(e)=>{
        const {name,checked} = e.target
        const param = {...cols}
        switch (name){
            case 'isQueuename' :
                param.isQueuename = checked
                break
            case 'isPos' :
                param.isPos = checked
                break
            case 'isInputPhone' :
                param.isInputPhone = checked
                break
        }
        setCols(param)
        localStorage.setItem(name,checked)
    }

    return (
        <>
            <h1>Список звонков</h1>

            <OverlayPanel ref={(el)=>setOp(el)} showCloseIcon dismissable >
                <div className="p-field-checkbox">
                    <Checkbox inputId="isQueuename" name="isQueuename"  checked={cols.isQueuename} onChange={handleColumnConfig} />
                    <label htmlFor="isQueuename">Очередь</label>
                </div>
                <div className="p-field-checkbox">
                    <Checkbox inputId="isPos" name="isPos" checked={cols.isPos} onChange={handleColumnConfig} />
                    <label htmlFor="isPos">Начальная позиция в очереди</label>
                </div>
                <div className="p-field-checkbox">
                    <Checkbox inputId="isInputPhone" name="isInputPhone" checked={cols.isInputPhone} onChange={handleColumnConfig} />
                    <label htmlFor="isInputPhone">Внутрений номер</label>
                </div>
            </OverlayPanel>

            <DataTable value={callList}
                       ref={(el)=>setDt(el)}
                       selectionMode="single"
                       onRowClick={e => rowClicked(e)}
                       dataKey={'callid'}
                       // scrollable scrollHeight="80vh"
                       className="p-datatable-striped"
                       paginator rows={10}
                       // removableSort
                       // resizableColumns
                       // columnResizeMode="fit"
                       paginatorRight
                       paginatorTemplate = "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                       currentPageReportTemplate="Показано записей от {first} до {last} из {totalRecords} "
                       rowsPerPageOptions={[10,25,50]}
                       sortMode="multiple"
                       loading={callList.length===0}
                       header={header}
            >
                <Column fiel={'agentdump_num'} body={agentDumpTemplate} style={{width:'48px'}}  />
                <Column field={'time'} header={'Время'} body={timeTemplate}  sortable />
                <Column field={'phone'} header={'Телефон'} filter filterPlaceholder="по номеру" />
                {
                   cols.isQueuename && (<Column field={'queuename'} header={'Очередь'} style={{width:'120px'}}  />)
                }
                { cols.isPos && (<Column field={'pos'} header={'Позиция'} sortable style={{width:'130px'}} />)}
                { cols.isInputPhone && (<Column field={'input_phone'} header={'Входной номер'} />)}
                <Column field={'agent'} header={'Оператор'} filter filterElement={agentFilter} />
                <Column field={'notanswer_num'} body={notAnswerTemplate} style={{width:'64px'}}  />
                <Column field={'wait'} header={'Ожидание'} body={waitTemplate} sortable style={{width:'144px'}} />
                <Column field={'calltime'} header={'Разговор'} body={calltimeTemplate} sortable style={{width:'144px'}}  />
                <Column field={'d_type'} header={'Результат звонка'}
                        sortable
                        filter
                        filterElement={resultFilter}
                />
            </DataTable>

        </>
    )
}