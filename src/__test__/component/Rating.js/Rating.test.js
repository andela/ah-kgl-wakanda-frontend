import React from 'react';
import { shallow } from 'enzyme';
import { Rating } from '../../../Components/Rating/Rating';

const props = {
  onRate: jest.fn(),
  slug: 'article_slug',
};

const mockedEvent = {
  target: {
    value: 5,
  },
};

describe('Article', () => {
  it('Should render the rating component', () => {
    const wrapper = shallow(<Rating {...props} />);
    expect(wrapper.find('input[name="rate"]').length).toBe(5);
  });
  it('Should post the rating', () => {
    const wrapper = shallow(<Rating {...props} />);
    wrapper.find('#star5').simulate('change', mockedEvent);
    expect(props.onRate).toHaveBeenCalled();
  });
});
