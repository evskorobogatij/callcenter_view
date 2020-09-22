import React from "react";
import ReactDOM from 'react-dom';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import AppInstall from "./AppInstall";


// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

ReactDOM.render(
    <React.StrictMode>

            <AppInstall />

    </React.StrictMode>,
    document.getElementById('root')
);