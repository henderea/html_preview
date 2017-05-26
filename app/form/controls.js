import React from 'react';
import PropTypes from 'prop-types';
import h from './helpers';
import autobind from 'autobind-decorator';

@autobind
export class SyncInputText extends React.Component {
  static propTypes = {
    context:     PropTypes.object.isRequired,
    onChange:    PropTypes.func,
    field:       PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    required:    PropTypes.bool
  };

  handleValueChange(e) {
    var value = e.target.value;
    this.props.context.setState(h.setValueInState(this.props.context.state, this.props.field, value));
    if(this.props.onChange) {
      this.props.onChange(this.props.field, value);
    }
  }

  render() {
    return (
      <input type="text" ref={this.props.field} placeholder={this.props.placeholder} value={h.getValueFromState(this.props.context.state, this.props.field)}
             onChange={this.handleValueChange} required={this.props.required} />
    );
  }
}

@autobind
export class SyncTextArea extends React.Component {
  static propTypes = {
    context:     PropTypes.object.isRequired,
    onChange:    PropTypes.func,
    field:       PropTypes.string.isRequired,
    placeholder: PropTypes.string
  };

  handleValueChange(e) {
    var value = e.target.value;
    this.props.context.setState(h.setValueInState(this.props.context.state, this.props.field, value));
    if(this.props.onChange) {
      this.props.onChange(this.props.field, value);
    }
  }

  render() {
    return (
      <textarea type="text" ref={this.props.field} placeholder={this.props.placeholder} value={h.getValueFromState(this.props.context.state, this.props.field)}
                onChange={this.handleValueChange} />
    );
  }
}

@autobind
export class SyncSelect extends React.Component {
  static propTypes = {
    context:  PropTypes.object.isRequired,
    onChange: PropTypes.func,
    field:    PropTypes.string.isRequired,
    options:  PropTypes.objectOf(PropTypes.string).isRequired
  };

  handleValueChange(e) {
    var value = e.target.value;
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
      <select ref={this.props.field} value={h.getValueFromState(this.props.context.state, this.props.field)} onChange={this.handleValueChange}>
        {Object.keys(this.props.options).map(this.makeOption)}
      </select>
    );
  }
}