import {Dialog} from "primereact/components/dialog/Dialog";
import React, {useEffect, useState} from "react";
import {CallTimeLine} from "../CallTimeLine/CallTimeLine";



function CallDetail(props) {

    const [callData,setCallData] = React.useState([])
    const [loaded,setLoaded] = useState(false)

    useEffect(()=>{
        setCallData([]);
        if (props.call){
            const d = props.call.replace('.','_')
            fetch(`/api/call_detail/${d}`).then(response=>response.json()).then(result=>setCallData(result)).then(()=>setLoaded(true))
        }
    },[props.call])

    const hide=()=>{
        props.setShowed(false)
        // setCallData([])
    }

    return (
        <>
            <Dialog header={`Подробная информация о звонке`} visible={props.showed} style={{ width: '60vw' }} maximizable onHide={() => hide()}>
                {props.showed &&
                    (
                        <div>
                            {
                                loaded ? <CallTimeLine callData={callData}/>
                                       : <div style={{textAlign:'center'}}><i className="pi pi-spin pi-spinner" style={{'fontSize': '8em'}}></i></div>
                            }

                        </div>
                    )
                }

            </Dialog>
        </>
    )
}


export {CallDetail}
