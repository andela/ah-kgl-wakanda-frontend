import React from 'react';
import './Header.scss';
import initialState from '../../store/initialState';

/**
 * Header component
 * @returns {void}
 */
const Header = () => {
  const { title } = initialState;
  return (
    <React.Fragment>
      <h1>{title}</h1>
    </React.Fragment>
  );
};

export default Header;
