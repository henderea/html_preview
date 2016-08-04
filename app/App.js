var React = require('react');
const queryString = require('query-string');
import { createHistory } from 'history'

import { SyncInputText, SyncSelect, SyncTextArea } from './form/controls';

const history = createHistory();
const location = history.getCurrentLocation();

var App = React.createClass({
    getInitialState: function() {
        return {val: (queryString.parse(location.search)["content"] || "")};
    },
    valueChanged: function(field, val) {
        history.push({pathname: location.pathname, search: ("?" + queryString.stringify({content: val}))});
    },
    render: function() {
        return (
            <table>
                <tbody>
                    <tr>
                        <td>
                            <SyncTextArea context={this} field="val" onChange={this.valueChanged} />
                        </td>
                        <td>
                            <div className="preview" dangerouslySetInnerHTML={{__html: this.state.val}} />
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
});

module.exports = App;