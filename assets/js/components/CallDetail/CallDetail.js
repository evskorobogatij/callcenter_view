import {Dialog} from "primereact/components/dialog/Dialog";
import React, {useEffect} from "react";
import {CallTimeLine} from "../CallTimeLine/CallTimeLine";



function CallDetail(props) {

    const [callData,setCallData] = React.useState([])

    useEffect(()=>{
        if (props.call){
            const d = props.call.replace('.','_')
            fetch(`/api/call_detail/${d}`).then(response=>response.json()).then(result=>setCallData(result))
        }
    },[props.call])

    const hide=()=>{
        props.setShowed(false)
        setCallData([])
    }

    return (
        <>
            <Dialog header={`Подробная информация о звонке`} visible={props.showed} style={{ width: '60vw' }} maximizable onHide={() => hide()}>
                {props.showed &&
                    (
                        <div>
                            <CallTimeLine callData={callData}/>
                        </div>
                    )
                }

            </Dialog>
        </>
    )
}


export {CallDetail}
