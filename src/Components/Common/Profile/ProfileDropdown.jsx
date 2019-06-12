import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Dropdown, Image } from 'react-bootstrap';
import './ProfileDropdown.scss';
import image from '../../../assets/img/images.png';
import DropdownItem from './DropdownItem';

/**
 * @param {*} props
 * @returns {void}
 */
const ProfileDropdown = props => {
  const { firstName, lastName, picture } = props;
  return (
    <React.Fragment>
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          <Image src={picture} roundedCircle />
          <span className="names">
            {firstName}
            {lastName}
          </span>
        </Dropdown.Toggle>
        <DropdownItem />
      </Dropdown>
    </React.Fragment>
  );
};

ProfileDropdown.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  picture: PropTypes.string,
};
ProfileDropdown.defaultProps = {
  picture: { image },
};

export default ProfileDropdown;
