import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Home.scss';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { changeName } from '../../actions/changeName';
/**
 *
 * Home component
 * @class Home
 * @extends {Component}
 */
class Home extends Component {
  state = {
    title: 'Hello world',
  };

  /**
   *
   * @returns {void}
   * @memberof Home
   */
  render() {
    const { title } = this.state;
    const { name, onChangeName } = this.props;
    const { team } = name;
    return (
      <div id="home" className="text-center">
        <h1>
          {title}
          {team}
        </h1>
        <button className="button" onClick={() => onChangeName('Avengers')}>
          Change to avengers
        </button>
      </div>
    );
  }
}

Home.propTypes = {
  onChangeName: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = ({ name }) => {
  return {
    name,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeName: name => dispatch(changeName(name)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
