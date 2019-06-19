import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import Signup from '../Containers/Signup/Signup';
import ResetPassword from '../Containers/ResetPassword/ResetPassword';
import UpdatePassword from '../Containers/UpdatePassword/UpdatePassword';
import NotFound from '../Containers/NotFound/NotFound';
import Login from '../Containers/Login/login';
import Home from '../Containers/Home/Home';

/**
 * NavBar component
 * @param {object} props
 * @returns {void}
 */
export const Routes = ({ isAuth }) => (
  <Router>
    <Switch>
      <Route
        exact
        path="/signup"
        render={props => (!isAuth ? <Signup {...props} /> : <Redirect to="/" />)}
      />

      <Route
        exact
        path="/login"
        render={props => (isAuth ? <Redirect to="/" /> : <Login {...props} />)}
      />

      <Route exact path="/reset-password" component={ResetPassword} />
      <Route exact path="/update-password/:token" component={UpdatePassword} />

      <Route exact path="*" component={NotFound} />
    </Switch>
  </Router>
);

Routes.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

/**
 * NavBar component
 * @param {object} props
 * @returns {void}
 */
export const mapStateToProps = ({ currentUser: { isAuth } }) => ({
  isAuth,
});

export default connect(mapStateToProps)(Routes);
