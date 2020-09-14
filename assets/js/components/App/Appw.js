import React from 'react';
import ReactDOM from 'react-dom';
import AppToolbar from "../AppToolbar/AppToolbar";

import {
    Route,
    Switch as RouteSwitch,
    Redirect,
    withRouter
} from "react-router-dom"

import Dashboard from '../../Dashboard'
import CallsList from '../../CallsList'

function App() {

    const [date, setDate] = React.useState(new Date());

    function selectDate(date) {
        setDate(date)
    }

    return (
        <div>
            <AppToolbar date={date} setDate={selectDate} />
            {/*<h1>Тест</h1>*/}
            <RouteSwitch>
            <div className="layout-main">
                <Route path='/dashboard' >
                    <Dashboard date={date} />
                </Route>
                <Route path='/call_list' component={CallsList} />
                <Redirect from={"/"} to={"/dashboard"} />
            </div>
            </RouteSwitch>
        </div>


    )
}

export default withRouter(App)