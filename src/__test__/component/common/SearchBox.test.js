import React from 'react';
import { mount } from 'enzyme';

import SearchBox from '../../../Components/Common/SearchBox/SearchBox';

describe('<SearchBox /> component', () => {
  let props;
  let wrapper;
  const e = { preventDefault: jest.fn() };
  beforeEach(() => {
    props = {
      onChange: jest.fn(e),
      onClick: jest.fn(e),
      onChangeFilter: jest.fn(),
    };
    wrapper = mount(<SearchBox {...props} />);
  });

  it('should render without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update the filter value', () => {
    wrapper.find('Button.dropdown-toggle').simulate('click');
    wrapper.find('DropdownItem#tag').simulate('click');
    expect(wrapper.state().filter).toBe('tag');
  });
});
