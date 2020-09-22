import React from "react";
import { InputText } from 'primereact/inputtext';
import {Dropdown} from "primereact/dropdown";
import {InputNumber} from "primereact/inputnumber";
import {Button} from "primereact/button";

import './../css/install.scss'
import {Card} from "primereact/card";

const dbTypes = [
    {label:'MySQL',value:'mysql'},
    {label:'PostgreSQL',value:'postgresql'}
]

function AppInstall(){

    const [config,setConfig] = React.useState({
        db_type: 'mysql',
        address : '',
        db : '',
        port : 0,
        username : '',
        password: ''
    })

    const dbTypeChange = (e) => {
        const {value} = e
        const params = {...config}
        params.db_type = value
        setConfig(params)
    }

    const changes= e =>{
        const {id,value} = e.target
        const params = {...config}
        params[id] = value
        setConfig(params)
    }

    const checkParam=()=>{
        console.log(config)
    }

    return (
        <div >
            <Card
                title={'Установка мониторинга'}
                footer={
                    <span>
                        <Button label="Сохранить" icon="pi pi-check" onClick={checkParam} />
                    </span>
                }
            >
                <div className={"p-field p-grid"}>
                    <label htmlFor={"db_type"} className={"p-col-fixed"} style={{width:'120px'}}>Тип базы данных</label>
                    <div className={"p-col"}>
                        <Dropdown options={dbTypes} value={config.db_type} onChange={dbTypeChange} />
                    </div>
                </div>
                <div className="p-field p-grid">
                    <label htmlFor="address" className="p-col-fixed" style={{width:'120px'}}>Имя сервера</label>
                    <div className="p-col">
                        <InputText id="address" value={config.address} onChange={changes} type="text"/>
                    </div>

                </div>
                <div className="p-field p-grid">
                    <label htmlFor="db" className="p-col-fixed" style={{width:'120px'}}>База данных</label>
                    <div className="p-col">
                        <InputText id="db" value={config.db} onChange={changes}  type="text"/>
                    </div>
                </div>
                <div className={"p-field p-grid"}>
                    <label htmlFor={"port"} className={"p-col-fixed"} style={{width:'120px'}}>Порт</label>
                    <div className={"p-col"}>
                        <InputNumber id={"port"} value={config.port} onValueChange={changes} mode="decimal" useGrouping={false} />
                    </div>
                </div>
                <div className="p-field p-grid">
                    <label htmlFor="username" className="p-col-fixed" style={{width:'120px'}}>Имя пользователя</label>
                    <div className="p-col">
                        <InputText id="username" value={config.username} onChange={changes}  type="text"/>
                    </div>
                </div>
                <div className="p-field p-grid">
                    <label htmlFor="password" className="p-col-fixed" style={{width:'120px'}}>Пароль</label>
                    <div className="p-col">
                        <InputText id="password" value={config.password} onChange={changes}  type="password"/>
                    </div>
                </div>
            </Card>



        </div>

    )
}

export default AppInstall