import React from 'react';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './NotifIcon.scss';

/**
 * Notification Icon component
 * @description render the icon and badge for the number of notification
 * @param {object} props {icon, notificationsCount, onClick}
 * @returns {object} jsx
 */
const NotifIcon = ({ icon, notificationsCount, onClick }) => (
  <div className="user mr-3">
    <div role="button" tabIndex="-1" onKeyDown={onClick} className="drop-down" onClick={onClick}>
      <FontAwesomeIcon icon={icon} className="notif-icon" />
      {notificationsCount >= 1 ? <span className="num">{notificationsCount}</span> : null}
    </div>
  </div>
);

NotifIcon.propTypes = {
  icon: PropTypes.any,
  notificationsCount: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

NotifIcon.defaultProps = {
  icon: faBell,
  notificationsCount: 0,
};

export default NotifIcon;
