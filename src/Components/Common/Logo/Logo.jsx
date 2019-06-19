import React from 'react';
import { PropTypes } from 'prop-types';
import logoImg from '../../../assets/img/logo_ah.png';
import './Logo.scss';
import { HOME_PATH } from '../../../paths';

/**
 * Logo component
 * @description render the logo in the navbar
 * @param {object} props {imgSrc, text, classes, linkPath}
 * @returns {object} jsx
 */
const Logo = ({ imgSrc, text, classes, linkPath }) => (
  <a href={linkPath} className={classes}>
    <img src={imgSrc} alt="ah-logo" />
    <h3>{text}</h3>
  </a>
);

Logo.propTypes = {
  imgSrc: PropTypes.string,
  text: PropTypes.string,
  classes: PropTypes.string,
  linkPath: PropTypes.string,
};

Logo.defaultProps = {
  imgSrc: logoImg,
  text: '',
  classes: 'logo',
  linkPath: HOME_PATH,
};

export default Logo;
