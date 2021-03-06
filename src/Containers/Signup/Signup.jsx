import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import './Signup.scss';

import illustration from '../../assets/images/signup-illustration.svg';
import { signup } from '../../actions/signupActions';
import Input from '../../Components/Common/input/input';
import Button from '../../Components/Common/Button/Button';
import logo from '../../assets/images/logo_ah_2.png';
import SocialLogin from '../../Components/SocialLogin';

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

  componentDidMount = () => {
    document.title = 'Sign Up';
  };

  componentWillUpdate = ({ user, history }) => {
    if (user) {
      localStorage.setItem('token_ah_wakanda', `Bearer ${user.token}`);
      localStorage.setItem('user_ah_wakanda', JSON.stringify(user));
      history.push('/');
    }
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
              </form>
              <p>OR SIGNUP WITH</p>
              <div className="social-login">
                <SocialLogin from="signup" />
              </div>
              <p className="signin-link">
                <span>Already have an account ? </span>
                <a href="/login"> Signin</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Signup.defaultProps = {
  loading: null,
  user: null,
};

Signup.propTypes = {
  error: PropTypes.string.isRequired,
  onSignup: PropTypes.func.isRequired,
  history: PropTypes.any.isRequired,
  loading: PropTypes.bool,
  user: PropTypes.object,
};

/**
 * Maps the state to props
 * @param {*} { auth }
 * @returns {object} props
 */
const mapStateToProps = ({ signupState }) => {
  const { loading, error, user } = signupState;
  return {
    loading,
    error,
    user,
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
