import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import './Signup.scss';

import illustration from '../../assets/images/signup-illustration.svg';
import { signup } from '../../actions/signupActions';
import Input from '../../Components/Common/input/input';
import Button from '../../Components/Common/Button/Button';
import logo from '../../assets/images/logo_ah_2.png';

/**
 * Registers the user account
 *
 * @class Signup
 * @extends {Component}
 */
export class Signup extends Component {
  state = { noMatch: null };

  /**
   *Handle form submission
   * @param {*} e
   * @memberof Signup
   * @returns {void}
   */
  onSubmit = e => {
    e.preventDefault();

    const { password, confirmPassword } = this.state;
    const { history } = this.props;

    if (password !== confirmPassword) {
      this.setState({ noMatch: 'Passwords do not match' });
      return;
    }

    this.setState({ noMatch: null });

    const { onSignup } = this.props;
    onSignup(this.state).then(res => {
      if (res.status === 200) {
        history.push('/');
      }
    });
  };

  /**
   * Contains the page layout
   *
   * @returns {object} Jsx element
   * @memberof Signup
   */
  render() {
    const { error, loading } = this.props;
    const { noMatch } = this.state;
    return (
      <div id="signup">
        <div className="wrapper">
          <div className="row">
            <div className="col-md-8 illustration-box">
              <img src={illustration} alt="" />
            </div>
            <div className="col-md-4 form-box">
              <img src={logo} className="logo" alt="" />
              <h1>Register</h1>
              {error ? <div className="error">{error}</div> : null}
              {noMatch ? <div className="error">{noMatch}</div> : null}
              <form action="#" className="form" onSubmit={this.onSubmit}>
                <Input
                  required
                  type="text"
                  name="username"
                  label="Username"
                  onType={({ target }) => {
                    this.setState(self => ({ ...self, username: target.value }));
                  }}
                />

                <Input
                  required
                  type="email"
                  name="email"
                  label="Email"
                  onType={({ target }) => {
                    this.setState(self => ({ ...self, email: target.value }));
                  }}
                />

                <Input
                  required
                  type="password"
                  name="password"
                  label="Password"
                  onType={({ target }) => {
                    this.setState(self => ({ ...self, password: target.value }));
                  }}
                />

                <Input
                  required
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  onType={({ target }) => {
                    this.setState(self => ({ ...self, confirmPassword: target.value }));
                  }}
                />

                <Button
                  text="Register"
                  type="submit"
                  className="button button-register "
                  full
                  loading={loading}
                />
                <p>Or sign up with</p>
                <div className="social-login">
                  <Button social="google" />
                  <Button social="facebook" />
                  <Button social="twitter" />
                </div>
                <p className="signin-link">
                  <span>Already have an account ? </span>
                  <a href="/login"> Signin</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  error: PropTypes.string.isRequired,
  onSignup: PropTypes.func.isRequired,
  history: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

/**
 * Maps the state to props
 * @param {*} { auth }
 * @returns {object} props
 */
const mapStateToProps = ({ signupState }) => {
  const { loading, error } = signupState;
  return {
    loading,
    error,
  };
};

/**
 * Maps dispatches to props
 * @param {*} dispatch
 * @returns {object} props
 */
const mapDispatchToProps = dispatch => {
  return {
    onSignup: user => dispatch(signup(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
