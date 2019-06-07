import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import './Home.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { changeName } from '../../actions/changeName';
import initialState from '../../store/initialState';

/**
 * Home component
 * @param {object} props
 * @returns {void}
 */
const Home = props => {
  const { title } = initialState;
  const { name, onChangeName } = props;
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
};

Home.propTypes = {
  onChangeName: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

/**
 *
 * @param {object} state
 * @returns {object} props
 */
const mapStateToProps = ({ name }) => {
  return {
    name,
  };
};

/**
 *
 * @param {*} dispatch
 * @returns {object} props
 */
const mapDispatchToProps = dispatch => {
  return {
    onChangeName: name => dispatch(changeName(name)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
