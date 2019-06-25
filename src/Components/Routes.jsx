import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ResetPassword from '../Containers/ResetPassword/ResetPassword';
import UpdatePassword from '../Containers/UpdatePassword/UpdatePassword';
import NotFound from '../Containers/NotFound/NotFound';
import Login from '../Containers/Login/login';
import * as paths from '../paths';
import Signup from '../Containers/Signup/Signup';
import CreateArticle from '../Containers/Article/Create/createArticle';
import SingleArticle from '../Containers/Article/Single/singleArticle';

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
        path={paths.SIGNUP_PATH}
        render={props => (!isAuth ? <Signup {...props} /> : <Redirect to={paths.HOME_PATH} />)}
      />

      <Route
        exact
        path={paths.SIGNIN_PATH}
        render={props => (isAuth ? <Redirect to={paths.HOME_PATH} /> : <Login {...props} />)}
      />

      <Route exact path={paths.RESET_PASSWORD_PATH} component={ResetPassword} />
      <Route exact path={paths.UPDATE_PASSWORD_PATH} component={UpdatePassword} />

      <Route exact path="/reset-password" component={ResetPassword} />
      <Route exact path="/update-password/:token" component={UpdatePassword} />
      <Route
        exact
        path="/articles/new"
        render={props => (isAuth ? <CreateArticle {...props} /> : <Redirect to="/login" />)}
      />
      <Route exact path="/articles/:slug" component={SingleArticle} />
      <Route exact path="/not-found" component={NotFound} />
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
