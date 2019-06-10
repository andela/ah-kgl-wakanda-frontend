import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Dropdown } from 'react-bootstrap';

const property = [
  {
    id: 1,
    text: 'Profile',
    icon: ' far fa-user fa-lg',
    link: '#/action-1',
  },
  {
    id: 2,
    text: 'Logout',
    icon: ' fas fa-sign-out-alt fa-lg',
    link: '#/action-2',
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
