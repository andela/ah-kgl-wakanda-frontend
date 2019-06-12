import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import './login.scss';
import images1 from '../../assets/images/undraw_authentication_fsn5.svg';
import logo from '../../assets/images/logo_ah_2.png';
import Input from '../../Components/Common/input/input';
import submitLogin from '../../actions/login';

/**
 *
 * @param {object} e
 * @returns {method} render
 */
class Login extends Component {
  state = {};

  /**
   * @param {object} props
   * @return {object}
   * s {jsx} react fragment
   */
  componentWillUpdate({ login, history }) {
    if (login.user) {
      localStorage.setItem('token_ah_wakanda', `Bearer ${login.user.token}`);
      history.push('/');
    }
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  submit = e => {
    e.preventDefault();
    const { onSubmitLogin } = this.props;
    onSubmitLogin(this.state);
  };

  form = () => (
    <form action="#" className="form" onSubmit={this.submit}>
      <Input type="email" name="email" label="email" onType={this.handleInput} required />
      <Input type="password" name="password" label="password" onType={this.handleInput} required />
      <button className="button button-register">LOGIN</button>
    </form>
  );

  /**
   *
   * @returns {jsx} react fragment
   */
  render() {
    const {
      login: { errorMessage },
    } = this.props;
    return (
      <div id="login">
        <div className="wrapper">
          <div className="row">
            <div className="col-sm-8 illustration-box">
              <img src={images1} alt="" />
            </div>
            <div className="col-sm-4 form-box">
              <div className="body">
                <img src={logo} className="logo" alt="" />
                <h1>Login</h1>
                <div className="error-message-server">{errorMessage}</div>
                {this.form()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.array.isRequired,
  onSubmitLogin: PropTypes.string.isRequired,
  history: PropTypes.any,
};

Login.defaultProps = {
  history: PropTypes.any,
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
