import React, { Component } from 'react';
import './Header.scss';

/**
 *
 * @class Header
 * @extends {Component}
 */
class Header extends Component {
  state = {
    title: 'Header',
  };

  /**
   * render the component
   * @returns {*} jsx
   */
  render() {
    const { title } = this.state;
    return (
      <React.Fragment>
        <h1>{title}</h1>
      </React.Fragment>
    );
  }
}

export default Header;
