import React, { Component } from 'react';
import './NotFound.css';

class NotFound extends Component {
  state = {
    title: 'Page Not Found',
  };

  render() {
    const { title } = this.state;
    return (
      <React.Fragment>
        <h1>{title}</h1>
      </React.Fragment>
    );
  }
}

export default NotFound;
