import React, {useEffect, useRef, useState} from "react";
import {Dropdown} from "primereact/dropdown";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import moment from "moment";

import {callDuration, callEventTemplate, phoneTemplate, timeTemplate, waitTemplate} from "../../lib/CellTemplates";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import {Card as TelCard} from "../../components/Card/Card";
import {format_minutes} from "../../lib/common";

function AgentWork(props) {

    const [loading,setLoading] = useState(false)
    const [agents,setAgents] = React.useState([]);
    const [selectedAgent, setSelectedAgent] = React.useState('')
    const timer = useRef()

    const [inputCalls, setInputCalls] = useState([])
    const [callsStatus,setCallsStatus] = useState({
        missed: 0,
        answered: 0,
        duration: 0
    })

    const table = useRef()

    const getInputCalls = () => {
        let s_date = moment(props.date).format("YYYY-MM-DD");
        setLoading(true)
        fetch(`/api/agent_work/${s_date}/${selectedAgent}`).then(response => response.json()).then(
            result=>{
                setInputCalls(result)
                setLoading(false)
            }
        )
    }

    const getAgentWorkStatic = () => {
        setCallsStatus({
            missed: 0,
            answered: 0,
            duration: 0
        })
        let s_date = moment(props.date).format("YYYY-MM-DD");
        fetch(`/api/agent_work_statistic/${s_date}/${selectedAgent}`).then(response => response.json()).then(result => setCallsStatus(result))
    }

    const exportData=()=>{
        table.current.exportCSV()
    }

    useEffect(() => {
        setInputCalls([])
        let s_date = moment(props.date).format("YYYY-MM-DD");
        let c_date = moment().format("YYYY-MM-DD");
        (s_date===c_date) ?
            timer.current = setInterval(getInputCalls,120000)
            :  clearInterval(timer.current)

        getInputCalls()
        getAgentWorkStatic()
        return (
            ()=>{
                clearInterval(timer.current)
            }
        )
    },[props.date,selectedAgent])

    useEffect(()=>{
        fetch("/api/agents").then(response=>response.json()).then(result=>{
            setAgents(result)
            if (result.length>0){
                setSelectedAgent(result[0])
            }
        });
    },[])

    useEffect(() => {
        console.log(selectedAgent)
    },[selectedAgent])

    return (
        <>

            <div className={"CallList-header"}>
                <h1 style={{marginTop: '8px', marginBottom: '8px'}}>Информация о агенте</h1>
                <div className={"CallLits-header-buttons"}>
                    <Dropdown options={agents} value={selectedAgent} placeholder={"Выберите агента"} onChange={e => setSelectedAgent(e.value)} autoWidth/>
                    <Button type={"button"} icon={"pi pi-save"} label={"Экспорт"} onClick={exportData} />
                </div>
            </div>


            <div className="p-grid p-fluid">
                <div className="p-col-12 p-sm-6 p-md-6 p-lg-3">
                        <TelCard title={"Звонки"} detail={"Количество обработаных звонков"} call_type={'incomming'} count={callsStatus.answered} />
                </div>
                <div className={"p-col-12 p-sm-6 p-md-6 p-lg-3"}>
                    <TelCard title={"Пропущеные"} detail={"Количество пропущеных звонков"} call_type={'abandon'} count={callsStatus.missed}/>
                </div>
                <div className={"p-col-12 p-sm-6 p-md-6 p-lg-3"}>
                    <TelCard title={`Длительность`} detail={"Общее время работы оператора"} call_type={'answered'} noanimate count={`${format_minutes(callsStatus.duration)}`} />
                </div>

            </div>

            <div className={"CallsList-resp"}>
                <DataTable
                    value={inputCalls}
                    ref={table}
                    selectionMode="single"
                    dataKey={'callid'}
                    className="CallsList-table"
                    paginator rows={9}
                    removableSort
                    // resizableColumns
                    // columnResizeMode="fit"
                    paginatorRight
                    paginatorTemplate = "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Показано записей от {first} до {last} из {totalRecords} "
                    rowsPerPageOptions={[10,25,50]}
                    loading={loading}
                >
                    <Column field={"time"} header={"Время"} body={timeTemplate}  sortable />
                    <Column field={"phone"} header={"Телефон"} body={phoneTemplate} />
                    <Column field={"event"} header={"Событие"} body={callEventTemplate}/>
                    {/*<Column field={"event_end"} />*/}
                    <Column field={"wait"}  header={"Ожидание"}  body={waitTemplate} />
                    <Column field={"duration"} header={"Длительность"} body={callDuration} />
                </DataTable>
            </div>

        </>
    )
}

export {AgentWork}