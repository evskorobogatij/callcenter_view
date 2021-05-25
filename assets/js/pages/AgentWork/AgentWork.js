import React, {useEffect, useRef, useState} from "react";
import {Dropdown} from "primereact/dropdown";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import moment from "moment";

import {callDuration, callEventTemplate, phoneTemplate, timeTemplate, waitTemplate} from "../../lib/CellTemplates";

function AgentWork(props) {

    const [loading,setLoading] = useState(false)
    const [agents,setAgents] = React.useState([]);
    const [selectedAgent, setSelectedAgent] = React.useState('')
    const timer = useRef()

    const [inputCalls, setInputCalls] = useState([])

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

    useEffect(() => {
        setInputCalls([])
        let s_date = moment(props.date).format("YYYY-MM-DD");
        let c_date = moment().format("YYYY-MM-DD");
        (s_date===c_date) ?
            timer.current = setInterval(getInputCalls,120000)
            :  clearInterval(timer.current)

        getInputCalls()
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
                </div>
            </div>



            <div className={"CallsList-resp"}>
                <DataTable
                    value={inputCalls}
                    ref={table}
                    selectionMode="single"
                    dataKey={'callid'}
                    className="CallsList-table"
                    paginator rows={10}
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