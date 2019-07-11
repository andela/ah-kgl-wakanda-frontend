import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import * as paths from '../../paths';
import defaultImage from '../../assets/img/blank_profile_pic.png';
import { emailNotificationSubscription } from '../../actions/profileActions';

import './SideBar.scss';

/**
 * SideBar component
 * @returns {void}
 */
export class SideBar extends Component {
  state = {
    allowEmailNotification: true,
    navLinks: [
      { key: 0, to: paths.HOME_PATH, icon: 'far fa-newspaper', name: 'Home' },
      { key: 1, to: '/myarticles', icon: 'fas fa-list-ul', name: 'My articles' },
      { key: 3, to: '/articles/bookmarked', icon: 'fas fa-bookmark', name: 'Bookmarked' },
      { key: 7, to: paths.LOGOUT_PATH, icon: 'fas fa-sign-out-alt', name: 'Logout' },
    ],
  };

  /**
   * SideBar component
   * @returns {void}
   */
  check = () => {
    const { user, onEmailNotificationSubscription } = this.props;
    const { allowEmailNotification } = user;
    this.setState({
      allowEmailNotification,
    });
    onEmailNotificationSubscription();
  };

  user = ({ user: { image, firstname, lastname, username } }) => (
    <React.Fragment>
      <div className="p-avatar row">
        <div className="avatar" style={{ backgroundImage: `url(${image || defaultImage})` }} />
      </div>

      <div className="name row">{`${firstname || ''} ${lastname || ''}`}</div>
      <div className="username row">{username}</div>
    </React.Fragment>
  );

  toggle = ({ allowEmailNotification }) => (
    <React.Fragment>
      <hr />
      <label htmlFor="emailNotif" onClick={this.check} className="switch">
        <input
          name="emailNotif"
          type="checkbox"
          onChange={this.check}
          checked={allowEmailNotification}
        />
        <span className="slider round" />
      </label>
      <span className="email-notif">Email Notification</span>
    </React.Fragment>
  );

  navigation = ({ navLinks }) =>
    navLinks.map((navLink, key) => (
      <NavLink key={key} to={navLink.to} exact className="item row">
        <i className={navLink.icon} />
        <span>{navLink.name}</span>
      </NavLink>
    ));

  accountStats = ({ articles, follows, followings }) => (
    <React.Fragment>
      <div className="item">
        <div className="label">Posts</div>
        <div className="data">{articles}</div>
      </div>
      <div className="item">
        <div className="label">Followers</div>
        <div className="data">{followings}</div>
      </div>
      <div className="item">
        <div className="label">Following</div>
        <div className="data">{follows}</div>
      </div>
    </React.Fragment>
  );

  /**
   * Home component
   * @returns {void}
   */
  render() {
    const {
      user,
      navbar: { isDrawerDisplay },
    } = this.props;
    return (
      <div className="sidenav slide-in-left" style={{ display: isDrawerDisplay ? 'flex' : null }}>
        <div className="user">{this.user(this.props)}</div>
        <div className="extend">
          <div className="wrapper">
            <div className="info row">{this.accountStats(user)}</div>
            <div className="navigation">{this.navigation(this.state)}</div>
          </div>
        </div>
      </div>
    );
  }
}
SideBar.defaultProps = {
  onEmailNotificationSubscription: null,
};

SideBar.propTypes = {
  user: PropTypes.object.isRequired,
  navbar: PropTypes.object.isRequired,
  onEmailNotificationSubscription: PropTypes.object,
};

/**
 * @param {object} state
 * @returns {object} props
 */
export const mapStateToProps = state => state;

/**
 *
 * @param {object} dispatch
 * @returns {method} dispatch
 */
export const mapDispatchToProps = dispatch => ({
  onEmailNotificationSubscription: () => dispatch(emailNotificationSubscription()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideBar);
