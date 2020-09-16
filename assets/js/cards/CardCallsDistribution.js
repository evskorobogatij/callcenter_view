import React from "react";
import {Card} from "primereact/components/card/Card";
import {Chart} from "primereact/components/chart/Chart";
import moment from "moment";

function CardCalsDistribution(props) {

    const [labels,setLabels] = React.useState([])
    const [data,setData] = React.useState([])

    React.useEffect(()=>{
        let s_date = moment(props.date).format("YYYY-MM-DD");
        fetch(`/api/day_distribution/${s_date}`).then(response => response.json()).then(
            result => {
                let d = []
                let v= []
                result.map((item)=>{
                    d.push(item.hour+' ч')
                    v.push(item.count)
                    //setLabels([...labels,item.hour+' ч'])
                })
                setLabels(d)
                setData(v)
            }
        ).then(()=>console.log('labels=',labels))
        // fetch(`/api/day_distribution/${s_date}`).then(response => console.log(response))
    },[props.date])

    const basicData = {
        labels: labels,
        datasets: [
            {
                label: 'Поступившие звонки',
                backgroundColor: '#FFA726',
                data: data
            }
        ]
    };

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