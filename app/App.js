import React from 'react';
const queryString = require('query-string');
import { createHistory } from 'history'

import { SyncTextArea } from './form/controls';

const history  = createHistory();
const location = history.getCurrentLocation();

import autobind from 'autobind-decorator';

@autobind
export class App extends React.Component {
  constructor() {
    super();
    this.state = { val: (queryString.parse(location.search)["content"] || "") };
  }

  valueChanged(field, val) {
    history.push({ pathname: location.pathname, search: ("?" + queryString.stringify({ content: val })) });
  }

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <SyncTextArea context={this} field="val" onChange={this.valueChanged} />
            </td>
            <td>
              <div className="preview" dangerouslySetInnerHTML={{ __html: this.state.val }} />
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}