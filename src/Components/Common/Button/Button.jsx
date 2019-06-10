import React from 'react';
import { PropTypes } from 'prop-types';
import './Button.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import google from '../../../assets/images/google.png';
import facebook from '../../../assets/images/facebook.png';
import twitter from '../../../assets/images/twitter.png';

/**
 * Switch button icons
 * @param {*} name
 * @returns {object} Icon
 */
const setIcon = name => {
  switch (name) {
    case 'google':
      return google;
    case 'facebook':
      return facebook;
    case 'twitter':
      return twitter;
    default:
      return null;
  }
};

/**
 * Change the element
 * opacity
 *
 * @param {*} e
 * @param {*} value
 * @returns {void}
 */
const changeOpacity = (e, value) => {
  e.target.style.opacity = value;
};

/**
 * Shared button component
 * @param {object} props
 * @returns {object} Jsx component
 */
const Button = ({ social, text, color, full, size, disabled, icon, loading }) => {
  return (
    <React.Fragment>
      {typeof social !== 'string' ? (
        <div
          role="button"
          tabIndex="-1"
          className="ah-button"
          style={{
            backgroundColor: null,
            color,
            display: full ? 'block' : 'inline-block',
            fontSize: `${size}px`,
            opacity: disabled ? 0.8 : 1,
          }}
          onMouseDown={e => (!disabled ? changeOpacity(e, 0.8) : null)}
          onMouseUp={e => (!disabled ? changeOpacity(e, 1) : null)}
        >
          {loading ? <div className="spinner" /> : null}
          <FontAwesomeIcon icon={icon} className="ah-icon" style={{ fontSize: `${size}px` }} />
          {text}
        </div>
      ) : (
        <div className="social" style={{ width: `${size + 6}px`, height: `${size + 6}px` }}>
          <img src={setIcon(social)} style={{ width: size ? `${size}px` : '40px' }} alt="" />
        </div>
      )}
    </React.Fragment>
  );
};

Button.defaultProps = {
  social: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  full: PropTypes.boolean,
  size: PropTypes.number,
  disabled: PropTypes.boolean,
  icon: PropTypes.any,
  loading: PropTypes.boolean,
};

Button.propTypes = {
  social: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  full: PropTypes.bool,
  size: PropTypes.number,
  disabled: PropTypes.bool,
  icon: PropTypes.any,
  loading: PropTypes.bool,
};

export default Button;
