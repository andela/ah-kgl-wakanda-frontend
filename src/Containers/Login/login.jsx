import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './login.scss';
import images1 from '../../assets/images/undraw_authentication_fsn5.svg';
import logo from '../../assets/images/logo_ah_2.png';
import Input from '../../Components/Common/input/input';
import submitLogin from '../../actions/login';
import Button from '../../Components/Common/Button/Button';

/**
 *
 * @param {object} e
 * @returns {method} render
 */
export class Login extends Component {
  state = {};

  /**
   * @param {object} props
   * @return {object}
   * s {jsx} react fragment
   */
  componentWillUpdate = ({ login, history }) => {
    if (login.user) {
      localStorage.setItem('token_ah_wakanda', `Bearer ${login.user.token}`);
      history.push('/');
    }
  };

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  submit = e => {
    e.preventDefault();
    const { onSubmitLogin } = this.props;
    onSubmitLogin(this.state);
  };

  form = () => {
    const {
      login: { loading },
    } = this.props;
    return (
      <form className="form mb-4" onSubmit={this.submit}>
        <Input type="email" name="email" label="email" onType={this.handleInput} required />
        <Input
          type="password"
          name="password"
          label="password"
          onType={this.handleInput}
          required
        />
        <Link to="/reset-password" href className="link-reset-password">
          Forgot password ?
        </Link>
        <Button text="LOGIN" full loading={loading} />
      </form>
    );
  };

  shareButton = () => (
    <div className="social-button">
      <Button social="google" />
      <Button social="facebook" />
      <Button social="twitter" />
    </div>
  );

  formBox = () => {
    const {
      login: { errorMessage },
    } = this.props;
    return (
      <div className="col-sm-4 form-box">
        <div className="body">
          <img src={logo} className="logo" alt="" />
          <h1>Login</h1>
          <div className="error-message-server">{errorMessage}</div>
          {this.form()}
          <p>Or Login with</p>
          {this.shareButton()}
          <p>
            Dont have an account ?
            <Link className="link-signin pl-2" href to="signup">
              Signup
            </Link>
          </p>
        </div>
      </div>
    );
  };

  /**
   *
   * @returns {jsx} react fragment
   */
  render() {
    return (
      <div id="login">
        <div className="wrapper">
          <div className="row" style={{ background: 'white' }}>
            <div className="col-sm-8 illustration-box">
              <img src={images1} alt="" />
            </div>
            {this.formBox()}
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.array.isRequired,
  onSubmitLogin: PropTypes.func.isRequired,
  history: PropTypes.any.isRequired,
};

/**
 *
 * @param {object} state
 * @returns {object} props
 */
const mapStateToProps = ({ login }) => ({
  login,
});

/**
 *
 * @param {*} dispatch
 * @returns {object} props
 */
const mapDispatchToProps = dispatch => ({
  onSubmitLogin: credentials => dispatch(submitLogin(credentials)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
