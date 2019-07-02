import React from 'react';
import { shallow } from 'enzyme';
import Logo from '../../../Components/Common/Logo/Logo';
import { HOME_PATH } from '../../../paths';

describe('Logo component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      linkPath: HOME_PATH,
    };
    wrapper = shallow(<Logo {...props} />);
  });

  it('should render without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
