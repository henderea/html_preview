import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route } from 'react-router'
import { browserHistory } from 'react-router';

import { App, Preview, NotFound } from './App.js';

var routes = (
  <Router history={browserHistory}>
    <Route path="/html_preview/preview" component={Preview} />
    <Route path="/html_preview/" component={App} />
    <Route path="*" component={NotFound} />
  </Router>
);

ReactDOM.render(routes, document.querySelector('#main'));