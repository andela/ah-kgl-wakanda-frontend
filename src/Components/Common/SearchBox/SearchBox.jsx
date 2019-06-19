import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputGroup, DropdownButton, Dropdown, FormControl, Button } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import './SearchBox.scss';

const filters = ['tag', 'author', 'title'];

/**
 * Searchbox component
 * @description should filter by title, tag, author or any word
 * @param {object} props {icon, onChange, onClick}
 * @returns {object} jsx
 */
const SearchBox = ({ icon, onChange, onClick, value }) => (
  <InputGroup className="searchbox">
    <DropdownButton
      as={InputGroup.Prepend}
      variant="outline-primary"
      title="filter  "
      id="input-group-dropdown-1"
    >
      {filters.map(item => {
        const index = filters.indexOf(item);
        return (
          <Dropdown.Item key={index} value={item}>
            {item}
          </Dropdown.Item>
        );
      })}
    </DropdownButton>
    <FormControl
      name="searchText"
      value={value}
      placeholder="Search..."
      onChange={onChange}
      aria-describedby="basic-addon2"
    />
    <InputGroup.Append>
      <Button variant="outline-primary" onClick={onClick}>
        <FontAwesomeIcon icon={icon} />
      </Button>
    </InputGroup.Append>
  </InputGroup>
);

SearchBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.any,
  value: PropTypes.string,
};

SearchBox.defaultProps = {
  icon: faSearch,
  value: '',
};

export default SearchBox;
