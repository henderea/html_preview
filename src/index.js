import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import BrowserRouter from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import { App, Preview, NotFound } from './App.js';

var routes = (
    <BrowserRouter>
        <Switch>
            <Route path="/html_preview/preview" component={Preview} />
            <Route path="/html_preview/" component={App} />
            <Route path="*" component={NotFound} />
        </Switch>
    </BrowserRouter>
);

ReactDOM.render(routes, document.querySelector('#root'));
registerServiceWorker();