import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Dropdown, Image } from 'react-bootstrap';
import './ProfileDropdown.scss';
import image from '../../../assets/img/blank_profile_pic.png';
import DropdownItem from './DropdownItem';

/**
 * @param {*} props
 * @returns {void}
 */
const ProfileDropdown = props => {
  const { username, picture } = props;
  return (
    <React.Fragment>
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          <Image src={picture} roundedCircle />
          <span className="names">{username}</span>
        </Dropdown.Toggle>
        <DropdownItem />
      </Dropdown>
    </React.Fragment>
  );
};

ProfileDropdown.propTypes = {
  username: PropTypes.string,
  picture: PropTypes.string,
};
ProfileDropdown.defaultProps = {
  picture: image,
  username: null,
};

export default ProfileDropdown;
