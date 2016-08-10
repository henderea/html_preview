import React from 'react';
const queryString = require('query-string');
import { browserHistory } from 'react-router';

import { SyncTextArea } from './form/controls';

import autobind from 'autobind-decorator';

@autobind
export class App extends React.Component {
  constructor() {
    super();
    this.state = { val: "" };
  }

  valueChanged(field, val) {
    browserHistory.push({ pathname: this.props.location.pathname, search: ("?" + queryString.stringify({ content: val })) });
  }

  componentWillMount() {
    this.setState({ val: (queryString.parse(this.props.location.search)["content"] || '') });
  }

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td rowSpan={2} className="half">
              <SyncTextArea context={this} field="val" onChange={this.valueChanged} />
            </td>
            <td style={{height: "2em"}} className="half">
              <a href={`${this.props.location.pathname}preview?${queryString.stringify({ content: this.state.val })}`}  target="_blank">Open Preview</a>
            </td>
            </tr>
          <tr>
            <td className="half">
              <div className="preview" dangerouslySetInnerHTML={{ __html: this.state.val }} />
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

@autobind
export class Preview extends React.Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <div style={{display: "inline-block", textAlign: "left"}} dangerouslySetInnerHTML={{__html: queryString.parse(this.props.location.search)["content"] || "" }} />
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export class NotFound extends React.Component {
  render() {
    return (
      <h1>Not Found</h1>
    );
  }
}