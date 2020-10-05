import React from 'react';
import ReactDOM from 'react-dom';
import AppToolbar from "../AppToolbar/AppToolbar";

import {
    Route,
    Switch as RouteSwitch,
    Redirect,
    withRouter
} from "react-router-dom"

import Dashboard from '../../pages/Dashboard/Dashboard'
import CallsList from '../../pages/CallsList/CallsList'

import './Appw.scss'
import CallsInputGraph from "../../pages/CallsGraph/CallsInputGraph";
import CallsAnsweredGraph from "../../pages/CallsGraph/CallsAnsweredGraph";
import CallsAbandonGraph from "../../pages/CallsGraph/CallsAbandonGraph";

function App() {

    const [date, setDate] = React.useState(new Date());

    function selectDate(date) {
        setDate(date)
    }

    return (
        <div>
            <AppToolbar date={date} setDate={selectDate} />
            {/*<h1>Тест</h1>*/}
            <div className="layout-main">
                <RouteSwitch>
                    <Route path='/dashboard' >
                        <Dashboard date={date} />
                    </Route>
                    <Route path='/calls_list' >
                        <CallsList date={date} />
                    </Route>
                    <Route path={"/did_log"}  >
                        <CallsInputGraph date={date}/>
                    </Route>
                    <Route path={"/answered_calls_log"} >
                        <CallsAnsweredGraph/>
                    </Route>
                    <Route path={"/abandon_calls_log"} component={CallsAbandonGraph}/>
                    <Redirect from={"/"} to={"/dashboard"} />
                </RouteSwitch>
            </div>
        </div>

    )
}

export default withRouter(App)