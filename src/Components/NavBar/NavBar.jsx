import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import './NavBar.scss';
import { toggleSideNav } from '../../actions/toggleSideNav';
import Logo from '../Common/Logo/Logo';
import NotifIcon from '../Common/NotifIcon/NotifIcon';
import SearchBox from '../Common/SearchBox/SearchBox';
import Button from '../Common/Button/Button';
import * as paths from '../../paths';
import ProfileDropdown from '../Common/Profile/ProfileDropdown';

/**
 * Render the NavBar
 * @class NavBar
 * @extends {Component}
 */
export class NavBar extends Component {
  /**
   * Creates an instance of NavBar
   * @param {*} props
   * @memberof NavBar
   */
  constructor(props) {
    super(props);
    const {
      navbar,
      onToggleSideNav,
      profile,
      currentUser,
      location,
      history,
      displaySearchBox,
    } = props;
    const { pathname } = location;
    this.profile = profile;
    this.displaySearchBox = displaySearchBox;
    this.pathname = pathname;
    this.history = history;
    this.navbar = navbar;
    this.onToggleSideNav = onToggleSideNav;
    this.currentUser = currentUser;
  }

  state = {
    searchText: '',
  };

  /**
   * help for typing in the searchBox
   * @param {Event} e
   * @memberof NavBar
   * @returns {void}
   */
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  /**
   * @memberof NavBar
   * @returns {void}
   */
  toggleSideNav = () => {
    this.onToggleSideNav();
  };

  /**
   * TODO: the teammate who should implement notification feature
   * should complete this function
   * @param {Event} e
   * @returns {void}
   */
  toggleNotification(e) {
    e.preventDefault();
  }

  /**
   * render authentication buttons
   * @returns {object} jsx
   */
  renderAuthButton() {
    return (
      <Nav className="btn-auth ml-auto">
        <Nav.Link href={paths.SIGNUP_PATH}>
          <Button text="SIGN UP" />
        </Nav.Link>
        <Nav.Link href={paths.SIGNIN_PATH}>
          <Button text="SIGN IN" outline />
        </Nav.Link>
      </Nav>
    );
  }

  /**
   * render ProfileDropdown and Notification icon
   * @param {string} notificationsCount
   * @param {string} username
   * @param {string} image
   * @returns {object} jsx
   * @memberof NavBar
   */
  renderProfileNotifIcon(notificationsCount, username, image) {
    return (
      <Nav className="d-flex flex-row">
        {true || (
          <NotifIcon notificationsCount={notificationsCount} onClick={this.toggleNotification} />
        )}
        <ProfileDropdown username={username} picture={image} />
      </Nav>
    );
  }

  /**
   * @param {object} icon
   * @returns {object} jsx
   * @memberof NavBar
   */
  renderHamburgerIcon(icon) {
    return (
      <Nav className="ml-3">
        <FontAwesomeIcon
          onClick={this.toggleSideNav}
          className="toggler-icon"
          icon={icon}
          size="2x"
        />
      </Nav>
    );
  }

  /**
   * render navbar
   * @param {*} isAuth
   * @param {*} notificationsCount
   * @param {*} username
   * @param {*} image
   * @param {*} user
   * @returns {object} jsx
   */
  renderNavBar(isAuth, notificationsCount, username, image) {
    const { searchText } = this.state;
    return (
      <React.Fragment>
        <Navbar fixed="top" className="flex-nowrap flex-row" expand="lg" variant="dark">
          <Navbar.Brand className="d-none mr-md-auto d-md-block">
            <Logo />
          </Navbar.Brand>
          {this.renderHamburgerIcon(faBars)}
          {this.displaySearchBox ? (
            <Nav className="mr-auto search-container">
              <SearchBox history={this.history} value={searchText} onChange={this.onChange} />
            </Nav>
          ) : null}

          {!isAuth ? this.renderAuthButton() : null}
          {isAuth && this.pathname !== paths.CREATE_ARTICLE_PATH ? (
            <a href="/articles/new">
              <Nav className="ml-md-auto">
                <Button text="NEW ARTICLE" />
              </Nav>
            </a>
          ) : null}
          {!isAuth ? null : this.renderProfileNotifIcon(notificationsCount, username, image)}
        </Navbar>
      </React.Fragment>
    );
  }

  /**
   * render the component
   * @returns {object} jsx
   * @memberof Navbar
   */
  render() {
    const { isAuth, notification } = this.currentUser;
    const { notificationsCount } = notification;
    const {
      profile: { user },
    } = this.props;

    const { username, image } = user;
    return this.renderNavBar(isAuth, notificationsCount, username, image);
  }
}

/**
 * @param {object} state
 * @returns {object} props
 */
export const mapStateToProps = ({ navbar, profile, currentUser }) => ({
  navbar,
  profile,
  currentUser,
});

/**
 * @param {function} dispatch
 * @returns {object} props
 */
export const mapDispatchToProps = dispatch => ({
  onToggleSideNav: () => dispatch(toggleSideNav()),
});

NavBar.propTypes = {
  onToggleSideNav: PropTypes.func.isRequired,
  navbar: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  displaySearchBox: PropTypes.bool,
  profile: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

NavBar.defaultProps = {
  displaySearchBox: true,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
