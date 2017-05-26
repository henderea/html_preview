import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom'
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

ReactDOM.render(routes, document.querySelector('#main'));