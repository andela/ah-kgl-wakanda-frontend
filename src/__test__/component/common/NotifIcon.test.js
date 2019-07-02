import React from 'react';
import { shallow } from 'enzyme';
import NotifIcon from '../../../Components/Common/NotifIcon/NotifIcon';

describe('Logo component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      onClick: jest.fn(),
      notificationsCount: 2,
    };
    wrapper = shallow(<NotifIcon {...props} />);
  });

  it('should render without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
