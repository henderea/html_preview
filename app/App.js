var React              = require('react');

import { SyncInputText, SyncSelect, SyncTextArea } from './form/controls';

var App = React.createClass({
    getInitialState: function() {
        return {val: ""};
    },
    render: function() {
        return (
            <table>
                <tbody>
                    <tr>
                        <td>
                            <SyncTextArea context={this} field="val" />
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