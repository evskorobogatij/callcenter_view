import React, {useEffect, useMemo, useState} from "react";
import moment from "moment";
import {Link} from "react-router-dom";
import {Button} from "primereact/components/button/Button";
import {Chart} from "primereact/components/chart/Chart";

function CallsRejectedGraph() {
    const [graphData,setGraphData] = useState({
        data : [],
        labels: []
    })

    useEffect(()=>{
        fetch(`/api/rejected_calls_log`).then(response => response.json()).then(
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
    },[]);

    const basicData = useMemo(()=>(
        {
            labels: graphData.labels,
            datasets: [
                {
                    label: 'Отклоненные звонки',
                    backgroundColor: '#ef6262',
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
                <h1>Количество отклоненных звонков по дням</h1>
            </div>

            <Chart type={"bar"} data={basicData} height={120}/>

        </>
    )
}


export default CallsRejectedGraph;