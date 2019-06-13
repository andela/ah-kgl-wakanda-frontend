import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import Home from '../Containers/Home/Home';
import NotFound from '../Containers/NotFound/NotFound';
import Login from '../Containers/Login/login';

/**
 * Home component
 * @param {object} props
 * @returns {void}
 */
export const Routes = ({ isAuth }) => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/home"
        render={props => (isAuth ? <Home {...props} /> : <Redirect to="/" />)}
      />
      <Route
        exact
        path="/login"
        render={props => (isAuth ? <Redirect to="/" /> : <Login {...props} />)}
      />
      <Route exact path="*" component={NotFound} />
    </Switch>
  </Router>
);

Routes.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

/**
 * Home component
 * @param {object} props
 * @returns {void}
 */
export const mapStateToProps = ({ currentUser: { isAuth } }) => ({
  isAuth,
});

export default connect(mapStateToProps)(Routes);
