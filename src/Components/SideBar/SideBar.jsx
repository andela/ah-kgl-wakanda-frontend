import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import * as paths from '../../paths';

import './SideBar.scss';

/**
 * SideBar component
 * @returns {void}
 */
export class SideBar extends Component {
  state = {
    checked: true,
    navLinks: [
      { key: 0, to: paths.HOME_PATH, icon: 'far fa-newspaper', name: 'Home' },
      { key: 1, to: '/my-articles', icon: 'fas fa-list-ul', name: 'My articles' },
      { key: 2, to: '/bookmarks', icon: 'far fa-heart', name: 'Bookmarks' },
      { key: 3, to: '/stats', icon: 'fas fa-signal', name: 'Statistics' },
      { key: 4, to: '/complaint', icon: 'fas fa-file', name: 'Complaints' },
      { key: 5, to: '/sidebar', icon: 'far fa-user', name: 'Create user' },
      { key: 6, to: paths.LOGOUT_PATH, icon: 'fas fa-sign-out-alt', name: 'Logout' },
    ],
  };

  /**
   * SideBar component
   * @returns {void}
   */
  check = () => {
    const { checked } = this.state;
    this.setState({
      checked: !checked,
    });
  };

  user = ({ user: { profileImage, firstName, lastName, username } }) => (
    <React.Fragment>
      <div className="p-avatar row">
        <div className="avatar" style={{ backgroundImage: `url(${profileImage})` }} />
      </div>

      <div className="name row">{`${firstName} ${lastName}`}</div>
      <div className="username row">{username}</div>
    </React.Fragment>
  );

  toggle = ({ checked }) => (
    <React.Fragment>
      <hr />
      <label htmlFor="emailNotif" onClick={this.check} className="switch">
        <input name="emailNotif" type="checkbox" onChange={this.check} checked={checked} />
        <span className="slider round" />
      </label>
      <span className="email-notif">Email Notification</span>
    </React.Fragment>
  );

  navigation = ({ navLinks }) =>
    navLinks.map((navLink, key) => (
      <NavLink key={key} to={navLink.to} className="item row">
        <i className={navLink.icon} />
        <span>{navLink.name}</span>
      </NavLink>
    ));

  accountStats = ({ posts, followers, following }) => (
    <React.Fragment>
      <div className="item">
        <div className="label">Posts</div>
        <div className="data">{posts}</div>
      </div>
      <div className="item">
        <div className="label">Followers</div>
        <div className="data">{followers}</div>
      </div>
      <div className="item">
        <div className="label">Following</div>
        <div className="data">{following}</div>
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
        <div className="info row">{this.accountStats(user)}</div>
        <div className="navigation">{this.navigation(this.state)}</div>
        <div className="notif">{this.toggle(this.state)}</div>
      </div>
    );
  }
}

SideBar.propTypes = {
  user: PropTypes.object.isRequired,
  navbar: PropTypes.object.isRequired,
};

/**
 * @param {object} state
 * @returns {object} props
 */
export const mapStateToProps = state => state;

export default connect(mapStateToProps)(SideBar);
