import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';

import LZString from 'lz-string';

import { SyncTextArea } from './form/controls';

const queryString = require('query-string');
const history = createHistory();

export class App extends Component {
    constructor() {
        super();
        this.state = { val: "" };
    }

    valueChanged(field, val) {
        history.push({ pathname: this.props.location.pathname, search: `?${queryString.stringify({ content: (LZString.compressToBase64(val) || '') })}` });
    }

    componentWillMount() {
        this.setState({ val: (LZString.decompressFromBase64(queryString.parse(this.props.location.search).content || '') || '') });
        history.listen((location) => {
            this.setState({ val: (LZString.decompressFromBase64(queryString.parse(location.search).content || '') || '') });
        });
    }

    render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <td rowSpan={2} className="half">
                            <SyncTextArea context={this} field="val" onChange={this.valueChanged.bind(this)} />
                        </td>
                        <td style={{ height: "2em" }} className="half">
                            <a href={`${this.props.location.pathname}preview?${queryString.stringify({ content: (LZString.compressToBase64(this.state.val) || '') })}`} target="_blank" rel="noopener noreferrer">Open Preview</a>
                        </td>
                    </tr>
                    <tr>
                        <td className="half">
                            <iframe style={{ width: '95%', height: '95%', padding: '0', margin: '0', backgroundColor: 'white' }} title="preview" srcDoc={this.state.val} />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export class Preview extends Component {
    constructor() {
        super();
        this.state = { val: "" };
    }

    componentWillMount() {
        this.setState({ val: (LZString.decompressFromBase64(queryString.parse(this.props.location.search).content || '') || '') });
        history.listen((location) => {
            this.setState({ val: (LZString.decompressFromBase64(queryString.parse(location.search).content || '') || '') });
        });
    }

    render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <td>
                            <iframe style={{ width: '95%', height: '95%', padding: '0', margin: '0', backgroundColor: 'white' }} title="full preview" srcDoc={this.state.val} />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export class NotFound extends Component {
    render() {
        return (
            <h1>Not Found</h1>
        );
    }
}