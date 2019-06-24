import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../../Containers/Search/NotFound';

describe('NotFound component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NotFound />);
  });

  it('should render NotFound component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
