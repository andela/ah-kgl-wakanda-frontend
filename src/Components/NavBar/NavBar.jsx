import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import './NavBar.scss';
import { toggleSideNav } from '../../actions/toggleSideNav';
import Logo from '../Common/Logo/Logo';
import MiniAccount from '../Common/MiniAccount/MiniAccount';
import NotifIcon from '../Common/NotifIcon/NotifIcon';
import SearchBox from '../Common/SearchBox/SearchBox';

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
    const { navbar, onToggleSideNav, currentUser } = props;
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
   * TODO: the teammate who should implement search filter feature
   * should complete this function
   * help clicking to submit search text
   * @param {Event} e
   * @memberof NavBar
   * @returns {void}
   */
  onClick = e => {
    e.preventDefault();
  };

  /**
   * @memberof NavBar
   * @returns {void}
   */
  toggleSideNav() {
    const { isDrawerDisplay } = this.navbar;
    this.onToggleSideNav(isDrawerDisplay);
  }

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
        <Navbar fixed="top" collapseOnSelect expand="lg" variant="dark">
          <Navbar.Brand>
            <Logo />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto search-container">
              <SearchBox value={searchText} onChange={this.onChange} onClick={this.onClick} />
            </Nav>
            {!isAuth ? null : (
              <Nav>
                <NotifIcon
                  notificationsCount={notificationsCount}
                  onClick={this.toggleNotification}
                />
                <MiniAccount username={username} avatarImg={image} />
              </Nav>
            )}
          </Navbar.Collapse>
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
    const { isAuth, notification, profile } = this.currentUser;
    const { notificationsCount } = notification;
    const { username, image } = profile;
    return this.renderNavBar(isAuth, notificationsCount, username, image);
  }
}

/**
 * @param {object} state
 * @returns {object} props
 */
export const mapStateToProps = state => state;

/**
 * @param {function} dispatch
 * @returns {object} props
 */
export const mapDispatchToProps = dispatch => ({
  onToggleSideNav: isDrawerDisplay => dispatch(toggleSideNav(isDrawerDisplay)),
});

NavBar.propTypes = {
  onToggleSideNav: PropTypes.func.isRequired,
  navbar: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
