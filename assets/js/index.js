import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router  } from "react-router-dom"

import App from "./components/App/Appw"
import '../css/index.scss';
import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

ReactDOM.render(
    <React.StrictMode>
        <Router /*history={history}*/>
            <App />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);


