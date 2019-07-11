import React from 'react';
import { mount, shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import {
  SearchBox,
  mapDispatchToProps,
  mapStateToProps,
} from '../../../Components/Common/SearchBox/SearchBox';

describe('<SearchBox /> component', () => {
  let props;
  let wrapper;
  const e = {
    preventDefault: jest.fn(),
    key: 'Enter',
  };
  const history = createMemoryHistory();
  beforeEach(() => {
    props = {
      value: 'dog',
      onChange: jest.fn(e),
      onClick: jest.fn(e),
      onChangeFilter: jest.fn(),
      onSearch: jest.fn(() => Promise.resolve({ data: {} })),
      history,
    };
    wrapper = mount(<SearchBox {...props} />);
  });

  it('should render without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should filter by author', () => {
    wrapper.setState({
      filter: 'author',
    });
    wrapper
      .find('.btn-search')
      .first()
      .simulate('click', e);
    expect(e.preventDefault).toHaveBeenCalled();
  });

  it('should filter by title', () => {
    wrapper.setState({
      filter: 'title',
    });
    wrapper
      .find('.btn-search')
      .first()
      .simulate('click', e);
    expect(e.preventDefault).toHaveBeenCalled();
  });

  it('should filter by tag', () => {
    wrapper.setState({
      filter: 'tag',
    });
    wrapper
      .find('.btn-search')
      .first()
      .simulate('click', e);
    expect(e.preventDefault).toHaveBeenCalled();
  });

  it('should filter by keyword', () => {
    wrapper.setState({
      filter: 'filter',
    });
    wrapper
      .find('.btn-search')
      .first()
      .simulate('click', e);
    expect(e.preventDefault).toHaveBeenCalled();
  });

  it('should search on keypress `Enter`', () => {
    wrapper = shallow(<SearchBox {...props} />);
    wrapper
      .find({ name: 'searchText' })
      .first()
      .simulate('keyPress', e, { key: 'Enter' });
    expect(e.preventDefault).toHaveBeenCalled();
  });

  it('should map dispatch to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSearch();
    expect(dispatch).toHaveBeenCalled();
  });

  it('should map state to props', () => {
    const searchFilter = {
      loading: true,
      error: false,
      articles: {},
    };

    expect(mapStateToProps({ searchFilter }).loading).toBeDefined();
  });

  it('should display the loading spinner', () => {
    const newProps = {
      ...props,
      value: undefined,
      loading: true,
    };

    wrapper = mount(<SearchBox {...newProps} />);
  });
});
