import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Dropdown } from 'react-bootstrap';

const property = [
  {
    id: 1,
    text: 'Profile',
    icon: ' far fa-user',
    link: '/profile',
  },
  {
    id: 2,
    text: 'My Articles',
    icon: ' fas fa-list-ul',
    link: '/myarticles',
  },
  {
    id: 3,
    text: 'Bookmarked',
    icon: ' fas fa-bookmark',
    link: '/articles/bookmarked',
  },
  {
    id: 4,
    text: 'Logout',
    icon: ' fas fa-sign-out-alt',
    link: '/logout',
  },
];
/**
 *
 * @returns {void}
 */
const DropdownItem = () => {
  return (
    <Dropdown.Menu id="menu">
      {property.map(item => {
        return (
          <Dropdown.Item style={{ margin: '10px 0px' }} key={item.id} href={item.link}>
            <i style={{ marginRight: '10px' }} className={item.icon} />
            {item.text}
          </Dropdown.Item>
        );
      })}
    </Dropdown.Menu>
  );
};

export default DropdownItem;
