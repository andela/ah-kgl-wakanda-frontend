import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import imgSrc from '../../assets/images/undraw_my_password.svg';
import logo from '../../assets/images/logo_ah.png';
import Input from '../../Components/Common/input/input';
import Button from '../../Components/Common/Button/Button';
import './UpdatePassword.scss';
import updatePasswordAction from '../../actions/updatePassword';

/**
 * Home component
 * @param {bool} updated
 * @param {string} message
 * @param {string} errorMessage
 * @param {bool} loading
 * @param {object} props
 * @returns {void}
 */
export class UpdatePassword extends Component {
  state = {
    password: '',
    confirmPassword: '',
    errorMessage: '',
  };

  /**
   *
   * @param {object} e
   * @returns {object} props
   */
  handleInput = e => {
    e.preventDefault();
    this.extractToken();
    const { target } = e;
    this.setState({
      [target.name]: target.value,
      errorMessage: '',
    });
  };

  /**
   *
   * @param {object} url
   * @returns {object} props
   */
  extractToken = () => {
    const { match } = this.props;
    return match.params.token;
  };

  /**
   *
   * @param {object} e
   * @returns {object} props
   */
  handleSubmit = e => {
    e.preventDefault();
    const { password, confirmPassword } = this.state;
    const { onUpdatePassword } = this.props;
    if (password !== confirmPassword) {
      this.setState({
        errorMessage: 'Password is different from Confirm Password',
      });
      return false;
    }
    const token = this.extractToken();
    onUpdatePassword(password, token);
  };

  form = (updated, message, errorMessage, loading) => {
    if (updated) {
      return (
        <div>
          <p id="updated" style={{ marginTop: '80px' }}>
            Your password has been updated successfully
          </p>
          <Link to="/login" className="go_to_login">
            <Button id="go_to_login" text="GO TO LOGIN" loading={loading} full />
          </Link>
        </div>
      );
    }
    return (
      <div>
        <div className="error-message-server">{message || errorMessage}</div>
        <form onSubmit={this.handleSubmit} className="form">
          <div className="form-group">
            <Input
              type="password"
              name="password"
              label="Password"
              required
              onType={this.handleInput}
            />
            <Input
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              required
              onType={this.handleInput}
            />
          </div>
          <Button text="UPDATE" loading={loading} full />
        </form>
      </div>
    );
  };

  /**
   *
   * @param {object} state
   * @returns {object} props
   */
  render() {
    const { updated, message, loading } = this.props;
    const { errorMessage } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 illustration-box">
            <img src={imgSrc} alt="reset password" />
          </div>
          <div className="col-md-4 col-xs-12 form-box">
            <div className="body">
              <img src={logo} className="logo" alt="" />
              <h3>Change password</h3>
              <p>
                Your password must contain at least:
                <br />
                - six(6) characters
                <br />
                - one(1) uppercase
                <br />
                - one(1) lowercase
                <br />
                - one(1) number
                <br />
              </p>
              {this.form(updated, message, errorMessage, loading)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdatePassword.propTypes = {
  onUpdatePassword: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  updated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

/**
 *
 * @param {object} state
 * @returns {object} props
 */
const mapStateToProps = ({ updatePassword }) => ({
  updated: updatePassword.updated,
  error: updatePassword.error,
  message: updatePassword.message,
  loading: updatePassword.loading,
});

/**
 *
 * @param {*} dispatch
 * @returns {object} props
 */
const mapDispatchToProps = dispatch => ({
  onUpdatePassword: (password, token) => dispatch(updatePasswordAction(password, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdatePassword);
