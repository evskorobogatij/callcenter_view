import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Chart} from "primereact/chart";
import moment from "moment";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";

import "./CallsGraph.scss"
// async function getData() {
//     const res = await fetch('/api/did_log')
//     const data = await res.json()
//     let descr = []
//     let values= []
//     data.map((item)=>{
//         descr.push(item.dt)
//         values.push(item.cn)
//     })
//     return {
//         values: values,
//         labels : descr
//     };
// }

function CallsInputGraph(props) {

    const [graphData,setGraphData] = useState({
        data : [],
        labels: []
    })

    React.useEffect(()=>{
        let s_date = moment(props.date).format("YYYY-MM-DD");
        fetch(`/api/did_log`).then(response => response.json()).then(
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
                    label: 'Поступившие звонки',
                    backgroundColor: '#20d077',
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

                <h1>Количество звонков по дням</h1>
            </div>

            <Chart type={"bar"} data={basicData}/>

        </>
    )
}

export default CallsInputGraph;
