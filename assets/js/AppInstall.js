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

    const [correct,setCorrect] = React.useState({
        address : true,
        db: true,
        username : true
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
        console.log(id)
        if (['address','db','username'].includes(id)){
            const tmp_check = {...correct}
            tmp_check[id] = value.length>0
            setCorrect(tmp_check)
        }
    }

    const checkParam=()=>{
        const tmp_check = {...correct}
        tmp_check.address = config.address.length>0
        tmp_check.db = config.db.length>0
        tmp_check.username = config.username.length>0
        setCorrect(tmp_check)
        if (tmp_check.address && tmp_check.db && tmp_check.username){
            fetch("/config/set_config",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(config)
            })
                .then(response=>response.json())
                .then(result=>console.log(result))
        }
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
                        <span className="p-input-icon-right">
                            <InputText id="address" value={config.address} onChange={changes} type="text" className={`${ !correct.address && ('p-invalid') }`} />
                        </span>
                        { !correct.address && (<small id="address-help" className="p-invalid p-d-block">Укажите имя сервера</small>) }
                    </div>

                </div>
                <div className="p-field p-grid">
                    <label htmlFor="db" className="p-col-fixed" style={{width:'120px'}}>База данных</label>
                    <div className="p-col">
                        <span className="p-input-icon-right">
                            <InputText id="db" value={config.db} onChange={changes} className={`${ !correct.db && ('p-invalid')}`} type="text"/>
                        </span>
                        { !correct.db && (<small id="address-help" className="p-invalid p-d-block">Укажите имя базы данных</small>)}
                    </div>
                </div>
                <div className={"p-field p-grid"}>
                    <label htmlFor={"port"} className={"p-col-fixed"} style={{width:'120px'}}>Порт</label>
                    <div className={"p-col"}>
                        <span className="p-input-icon-right">
                            <InputNumber id={"port"} value={config.port} onValueChange={changes} mode="decimal" useGrouping={false} />
                        </span>
                    </div>
                </div>
                <div className="p-field p-grid">
                    <label htmlFor="username" className="p-col-fixed" style={{width:'120px'}}>Имя пользователя</label>
                    <div className="p-col">
                        <span className="p-input-icon-right">
                            <i className={"pi pi-user"} />
                            <InputText id="username" value={config.username} onChange={changes} className={`${ !correct.username && ('p-invalid')}`} type="text"/>
                        </span>
                        { !correct.username && (<small id="address-help" className="p-invalid p-d-block">Укажите имя пользователя</small>)}
                    </div>
                </div>
                <div className="p-field p-grid">
                    <label htmlFor="password" className="p-col-fixed" style={{width:'120px'}}>Пароль</label>
                    <div className="p-col">
                        <span className="p-input-icon-right">
                            <i className={"pi pi-lock"} />
                            <InputText id="password" value={config.password} onChange={changes}  type="password"/>
                        </span>
                    </div>
                </div>
            </Card>



        </div>

    )
}

export default AppInstall