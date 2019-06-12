import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Dropdown, Col, Row } from 'react-bootstrap';

const property = [
  {
    text: 'Profile',
    icon: ' far fa-user',
    link: '#/action-1',
  },
  {
    text: 'Logout',
    icon: ' fas fa-sign-out-alt',
    link: '#/action-2',
  },
];
/**
 *
 * @returns {void}
 */
const DropdownItem = () => {
  return (
    <Dropdown.Menu>
      {property.map(item => {
        return (
          <Dropdown.Item href={item.link}>
            <Row>
              <Col sm={2}>
                <i className={item.icon} />
              </Col>
              <Col sm={8}>{item.text}</Col>
            </Row>
          </Dropdown.Item>
        );
      })}
    </Dropdown.Menu>
  );
};

export default DropdownItem;
