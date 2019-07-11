import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  InputGroup,
  DropdownButton,
  Dropdown,
  FormControl,
  Button,
  Spinner,
} from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import './SearchBox.scss';
import { search } from '../../../actions/search';

const filters = ['author', 'title'];

/**
 * Searchbox component
 * @description should filter by title, tag, author or any word
 * @param {object} props {icon, onChange, onClick}
 * @returns {object} jsx
 */
export class SearchBox extends Component {
  state = {
    filter: 'filter',
  };

  /**
   * update the selected filter
   * @returns {void}
   */
  componentWillMount() {
    const {
      searchParams: { filter },
    } = this.props;
    if (filter) {
      this.setState({ filter });
    }
  }

  /**
   * update the selected filter
   * @param {string} filterValue
   * @returns {void}
   */
  onChangeFilter = filterValue => {
    this.setState({ filter: filterValue });
  };

  /**
   * submit the search filter
   * @param {object} e
   * @returns {void}
   */
  onSubmitSearch = e => {
    e.preventDefault();
    const { value, onSearch, history } = this.props;
    const { filter } = this.state;

    if (value) {
      const url = `/api/search?${filter !== 'filter' ? filter : 'keyword'}=${value}`;
      onSearch(url).then(() => {
        history.push({
          pathname: `/search`,
          state: {
            search: value,
            filter,
          },
        });
      });
    }
  };

  /**
   * handle search filter when press -enter-
   * @param {object} e
   * @returns {void}
   */
  onKeyPress = e => {
    if (e.key === 'Enter') {
      return this.onSubmitSearch(e);
    }
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
    const {
      icon,
      onChange,
      loading,
      searchParams: { search: searchValue },
    } = this.props;
    const { filter } = this.state;
    return (
      <InputGroup className="searchbox">
        <DropdownButton as={InputGroup.Prepend} variant="outline-primary" title={filter}>
          {filters.map(item => {
            const index = filters.indexOf(item);
            return this.renderItems(item, index);
          })}
        </DropdownButton>
        <FormControl
          name="searchText"
          defaultValue={searchValue}
          placeholder="Search..."
          onKeyPress={this.onKeyPress}
          onChange={onChange}
        />
        <InputGroup.Append>
          <Button
            className="btn-search"
            variant="outline-primary"
            disabled={loading}
            onClick={this.onSubmitSearch}
          >
            {!loading ? (
              <FontAwesomeIcon icon={icon} />
            ) : (
              <Spinner animation="border" size="sm" variant="secondary" />
            )}
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

SearchBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.any,
  value: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  history: PropTypes.any.isRequired,
  loading: PropTypes.bool,
  searchParams: PropTypes.object,
};

SearchBox.defaultProps = {
  icon: faSearch,
  value: '',
  loading: false,
  searchParams: {},
};

/**
 * @param {object} state
 * @returns {object} props
 */
export const mapStateToProps = ({ searchFilter }) => {
  const { loading, error, articles } = searchFilter;
  return {
    loading,
    error,
    articles,
  };
};

/**
 * @param {*} dispatch
 * @returns {object} props
 */
export const mapDispatchToProps = dispatch => ({
  onSearch: url => dispatch(search(url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBox);
