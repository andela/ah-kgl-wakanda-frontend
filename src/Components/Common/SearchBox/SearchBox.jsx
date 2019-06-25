import React, { Component } from 'react';
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
class SearchBox extends Component {
  state = {
    filter: 'filter',
  };

  /**
   * update the selected filter
   * @param {string} filterValue
   * @returns {void}
   */
  onChangeFilter = filterValue => {
    this.setState({ filter: filterValue });
  };

  /**
   *
   * @param {string} item
   * @param {int} index
   * @returns {object} jsx
   * @memberof SearchBox
   */
  renderItems(item, index) {
    return (
      <Dropdown.Item key={index} id={item} onClick={() => this.onChangeFilter(item)} value={item}>
        {item}
      </Dropdown.Item>
    );
  }

  /**
   * render the component
   * @returns {object} jsx
   * @memberof SearchBox
   */
  render() {
    const { icon, onChange, onClick, value } = this.props;
    const { filter } = this.state;
    return (
      <InputGroup className="searchbox">
        <DropdownButton as={InputGroup.Prepend} variant="outline-primary" title={filter}>
          {filters.map(item => {
            const index = filters.indexOf(item);
            return this.renderItems(item, index);
          })}
        </DropdownButton>
        <FormControl name="searchText" value={value} placeholder="Search..." onChange={onChange} />
        <InputGroup.Append>
          <Button variant="outline-primary" onClick={onClick}>
            <FontAwesomeIcon icon={icon} />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

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
