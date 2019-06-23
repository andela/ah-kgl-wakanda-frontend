import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Button from './Common/Button/Button';
import { socialLogin } from '../actions/socialLogin';

/**
 * @param {*} props
 * @returns {object} jsx
 * Social login component
 */
export class SocialLogin extends Component {
  callTwitterLogin = () => {
    window.location.replace(`${process.env.REACT_APP_BACKEND_URL}/api/auth/twitter`);
  };

  responseSocialLogin = ({ response, provider }) => {
    const { onSocialLogin } = this.props;
    const { accessToken } = response;
    onSocialLogin(accessToken, provider);
  };

  /**
   * @returns {*} dispatch
   */
  render() {
    return (
      <React.Fragment>
        <GoogleLogin
          id="google"
          clientId={process.env.REACT_APP_GOOGLE_APP_ID}
          render={renderProps => <Button social="google" onClick={renderProps.onClick} />}
          onSuccess={response => this.responseSocialLogin({ response, provider: 'google' })}
          onFailure={response => this.responseSocialLogin({ response, provider: 'google' })}
          cookiePolicy="single_host_origin"
        />

        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_APP_ID}
          callback={response => this.responseSocialLogin({ response, provider: 'facebook' })}
          render={renderProps => <Button social="facebook" onClick={renderProps.onClick} />}
        />
        <Button id="twitter" social="twitter" onClick={this.callTwitterLogin} />
      </React.Fragment>
    );
  }
}

SocialLogin.propTypes = {
  onSocialLogin: PropTypes.func.isRequired,
};

/**
 *
 * @param {*} dispatch
 * @returns {object} props
 */
const mapDispatchToProps = dispatch => ({
  onSocialLogin: (accessToken, provider) => dispatch(socialLogin(accessToken, provider)),
});

export default connect(
  null,
  mapDispatchToProps,
)(SocialLogin);
