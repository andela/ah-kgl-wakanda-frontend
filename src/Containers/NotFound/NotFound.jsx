import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import './NotFound.css';

/**
 *
 * @class NotFound
 * @extends {Component}
 */
class NotFound extends Component {
  state = {};

  /**
   * render the component
   * @returns {*} jsx
   */
  render() {
    const {
      system: {
        notFound: { attribute },
      },
    } = this.props;
    return (
      <React.Fragment>
        <div className="error-pg">
          <h1 className="message display-4">{`${attribute.toUpperCase()} NOT FOUND !!`}</h1>
          <div className="error-number">
            <div className="number left-coffee">4</div>
            <div className="coffee-mug" />
            <div className="number right-coffee">4</div>
          </div>
          <div className="sm-screen">404</div>
          <div className="mean-msg">
            Oooops!!, something went wrong
            <a href="/"> go back home!</a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

NotFound.propTypes = {
  system: PropTypes.object.isRequired,
};

/**
 *
 * @param {object} state
 * @returns {object} props
 */
const mapStateToProps = ({ system }) => {
  return {
    system,
  };
};

export default connect(mapStateToProps)(NotFound);
