import React, { useEffect, useMemo, useState} from "react";
import {Chart} from "primereact/chart";
import moment from "moment";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";

import "./CallsGraph.scss"

function CallsAnsweredGraph() {
    const [graphData,setGraphData] = useState({
        data : [],
        labels: []
    })

    React.useEffect(()=>{
        // let s_date = moment(props.date).format("YYYY-MM-DD");
        fetch(`/api/answered_calls_log`).then(response => response.json()).then(
            result => {
                let descr = []
                let values= []
                result.reverse().map((item)=>{
                    descr.push(moment(item.dt).lang('ru').format("DD MMM"))
                    values.push(item.cn)
                })
                setGraphData({
                    data: values,
                    labels: descr
                })
            }
        )
    },[])

    useEffect(()=>{
        console.log(graphData)
    },[graphData])

    const basicData = useMemo(()=>(
        {
            labels: graphData.labels,
            datasets: [
                {
                    label: 'Обратаные звонки',
                    backgroundColor: '#007be5',
                    data: graphData.data
                }
            ]
        }
    ),[graphData])

    return (
        <>
            <div className={"CallGraph-title"}>
                <Link to={"dasboard"} >
                    <Button icon="pi pi-chevron-left" className={"p-button-outlined"} label={"Назад"} />
                </Link>

                <h1>Количество обработанных звонков по дням</h1>
            </div>

            <Chart type={"bar"} data={basicData}/>

        </>
    )
}

export default CallsAnsweredGraph
