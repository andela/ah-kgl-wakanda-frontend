import React from 'react';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import BlackProfilePic from '../../../assets/img/blank_profile_pic.png';
import './MiniAccount.scss';

/**
 * MiniAccount component
 * @description render user info in a mini avatar and username
 * @param {object} props {username, avatar, icon}
 * @returns {object} jsx
 */
const MiniAccount = ({ username, avatarImg, icon }) => (
  <div className="mini-account">
    <div className="user drop" id="menu-btn">
      <div>
        <img className="avatar" src={avatarImg} alt="user_avatar" />
      </div>
      <div className="username">{username}</div>
      <div className="drop-down drop">
        <FontAwesomeIcon icon={icon} />
      </div>
    </div>
  </div>
);

MiniAccount.propTypes = {
  username: PropTypes.string.isRequired,
  avatarImg: PropTypes.string,
  icon: PropTypes.any,
};

MiniAccount.defaultProps = {
  avatarImg: BlackProfilePic,
  icon: faChevronDown,
};

export default MiniAccount;
