import React from 'react';
import PropTypes from 'prop-types';
import h from './helpers';

class SyncInputText extends React.Component {
    handleValueChange(e) {
        var { value } = e.target;
        this.props.context.setState(h.setValueInState(this.props.context.state, this.props.field, value));
        if(this.props.onChange) {
            this.props.onChange(this.props.field, value);
        }
    }

    render() {
        return (
            <input type="text" ref={this.props.field} placeholder={this.props.placeholder} value={h.getValueFromState(this.props.context.state, this.props.field)}
                onChange={this.handleValueChange.bind(this)} required={this.props.required} />
        );
    }
}
SyncInputText.propTypes = {
    context: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    field: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool
};

class SyncTextArea extends React.Component {
    handleValueChange(e) {
        var { value } = e.target;
        this.props.context.setState(h.setValueInState(this.props.context.state, this.props.field, value));
        if(this.props.onChange) {
            this.props.onChange(this.props.field, value);
        }
    }

    render() {
        return (
            <textarea type="text" ref={this.props.field} placeholder={this.props.placeholder} value={h.getValueFromState(this.props.context.state, this.props.field)}
                onChange={this.handleValueChange.bind(this)} />
        );
    }
}
SyncTextArea.propTypes = {
    context: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    field: PropTypes.string.isRequired,
    placeholder: PropTypes.string
};

class SyncSelect extends React.Component {
    handleValueChange(e) {
        var { value } = e.target;
        this.props.context.setState(h.setValueInState(this.props.context.state, this.props.field, value));
        if(this.props.onChange) {
            this.props.onChange(this.props.field, value);
        }
    }

    makeOption(opt) {
        return (
            <option value={opt} key={opt}>{this.props.options[opt]}</option>
        );
    }

    render() {
        return (
            <select ref={this.props.field} value={h.getValueFromState(this.props.context.state, this.props.field)} onChange={this.handleValueChange.bind(this)}>
                {Object.keys(this.props.options).map(this.makeOption.bind(this))}
            </select>
        );
    }
}
SyncSelect.propTypes = {
    context: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    field: PropTypes.string.isRequired,
    options: PropTypes.objectOf(PropTypes.string).isRequired
};

export { SyncInputText, SyncTextArea, SyncSelect };