import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import imgSrc from '../../assets/images/undraw_my_password.svg';
import logo from '../../assets/images/logo_ah.png';
import Input from '../../Components/Common/input/input';
import Button from '../../Components/Common/Button/Button';
import './ResetPassword.scss';
import resetPasswordAction from '../../actions/resetPassword';

/**
 * Home component
 * @param {object} props
 * @returns {void}
 */
export class ResetPassword extends Component {
  state = {
    email: '',
  };

  /**
   *
   * @param {object} e
   * @returns {object} props
   */
  handleInput = e => {
    e.preventDefault();
    const { target } = e;
    this.setState({
      [target.name]: target.value,
    });
  };

  /**
   *
   * @param {object} e
   * @returns {object} props
   */
  handleSubmit = e => {
    e.preventDefault();
    const { onResetPassword } = this.props;
    const { email } = this.state;
    onResetPassword(email);
  };

  /**
   *
   * @param {object} state
   * @returns {object} props
   */
  render() {
    const { emailSent, message, loading } = this.props;
    const changeAfterSent = (
      <p id="email-sent" style={{ marginTop: '80px' }}>
        Check your email address to update your password
      </p>
    );

    let form = (
      <div>
        <div className="error-message-server">{message}</div>
        <form onSubmit={this.handleSubmit} className="form">
          <Input type="email" name="email" label="Email" required onType={this.handleInput} />
          <Button
            text="RESET"
            loading={loading}
            full
            type="submit"
            className="button button-forgot-password"
          />
        </form>
      </div>
    );

    if (emailSent) form = changeAfterSent;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 illustration-box">
            <img src={imgSrc} alt="reset password" />
          </div>
          <div className="col-md-4 col-xs-12 form-box">
            <div className="body">
              <img src={logo} className="logo" alt="" />
              <h3>Reset your password</h3>
              <p>
                An email address containing the link to reset your password will be sent to this
                email adress
              </p>
              {form}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  onResetPassword: PropTypes.func.isRequired,
  emailSent: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

/**
 *
 * @param {object} state
 * @returns {object} props
 */
const mapStateToProps = ({ resetPassword }) => ({
  emailSent: resetPassword.emailSent,
  error: resetPassword.error,
  message: resetPassword.message,
  loading: resetPassword.loading,
});

/**
 *
 * @param {*} dispatch
 * @returns {object} props
 */
const mapDispatchToProps = dispatch => ({
  onResetPassword: email => dispatch(resetPasswordAction(email)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPassword);
