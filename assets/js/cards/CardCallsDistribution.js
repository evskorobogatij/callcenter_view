import React, {useMemo, useState} from "react";
import {Card} from "primereact/components/card/Card";
import {Chart} from "primereact/components/chart/Chart";
import moment from "moment";

function CardCalsDistribution(props) {

    const [graphData,setGraphData] = useState({
        data : [],
        labels: []
    })

    React.useEffect(()=>{
        let s_date = moment(props.date).format("YYYY-MM-DD");
        fetch(`/api/day_distribution/${s_date}`).then(response => response.json()).then(
            result => {
                let descr = []
                let values= []
                result.map((item)=>{
                    descr.push(item.hour+' ч')
                    values.push(item.count)
                    //setLabels([...labels,item.hour+' ч'])
                })
                setGraphData({
                    data: values,
                    labels: descr
                })
            }
        )
    },[props.date])

    const testData = React.useMemo(()=>{
        return {
            label : [],
            data : []
        }
    })

    const basicData = useMemo(()=>(
         {
            labels: graphData.labels,
            datasets: [
                {
                    label: 'Поступившие звонки',
                    backgroundColor: '#FFA726',
                    data: graphData.data
                }
            ]
        }
    ),[graphData])


    let basicOptions = {
        legend: {
            labels: {
                fontColor: '#495057'
            }
        },
        scales: {
            xAxes: [{
                ticks: {
                    fontColor: '#495057'
                }
            }],
            yAxes: [{
                ticks: {
                    fontColor: '#495057'
                }
            }]
        }
    };

    return (
        <Card title={"Распределение звонков"}>
            <Chart type={"bar"} data={basicData} />

        </Card>
    )
}

export default CardCalsDistribution