import React, { Component } from 'react';
import Joi from 'joi-browser';
import { PropTypes } from 'prop-types';
import './input.scss';

/**
 *
 * @param {object} s
 * @returns {method} render
 */
class Input extends Component {
  state = {
    message: '',
  };

  /**
   *
   * @param {object} type
   * @param {object} name
   * @param {object} value
   * @returns {object} {status, message}
   */
  joiValidation = (type, name, value) => {
    const schema = {},
      input = {};
    input[`${name}`] = value;
    switch (type) {
      case 'text':
        schema[`${name}`] = Joi.string()
          .trim()
          .min(3)
          .required();
        break;
      case 'email':
        schema[`${name}`] = Joi.string()
          .email()
          .required();
        break;
      case 'password':
        schema[`${name}`] = Joi.string()
          .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/)
          .required();
        break;
      default:
        break;
    }
    const { error } = Joi.validate(input, schema);
    if (error) {
      const { key } = error.details[0].context;
      if (key === 'password') {
        return {
          message:
            'Your password must have at least 8 digits and contain 1 Uppercase, 1 Lowercase, 1 number',
        };
      }
      return {
        message: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
      };
    }
    return {};
  };

  /**
   *
   * @param {object} e
   * @returns {jsx} react fragment
   */
  handleInput = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleError = ({ target }) => {
    const { name, value, type } = target;
    const { message = '' } = this.joiValidation(type, name, value);
    this.setState({ message });
  };

  capitalize = s => s[0].toUpperCase() + s.slice(1);

  inputClasses = () => {
    const { message } = this.state;
    if (message) {
      return 'form-control input-error';
    }
    return 'form-control';
  };

  /**
   *
   * @returns {jsx} react fragment
   */
  render() {
    const { type = 'text', name, label, placeholder, required = false, onType } = this.props;
    const { message } = this.state;
    return (
      <React.Fragment>
        <div className="form-group text-left">
          <label htmlFor={name}>{label && this.capitalize(label)}</label>
          <input
            type={type}
            name={name}
            onChange={this.handleInput}
            onInput={onType}
            onBlur={this.handleError}
            id={name}
            onInput={onType}
            required={required}
            placeholder={placeholder && this.capitalize(placeholder)}
            className={this.inputClasses()}
          />
          {message && <div className="error-message">{message}</div>}
        </div>
      </React.Fragment>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
  onType: PropTypes.func.isRequired,
};

export default Input;
