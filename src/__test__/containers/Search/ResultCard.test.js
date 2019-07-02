import React from 'react';
import { shallow } from 'enzyme';
import ResultCard from '../../../Containers/Search/ResultCard';

describe('ResultCard component', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      slug: 'slug',
      username: 'test',
      date: '12 jun 2019',
      title: 'articles',
      description: 'lorem ipsum',
    };
    wrapper = shallow(<ResultCard {...props} />);
  });

  it('should render ResultCard component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
