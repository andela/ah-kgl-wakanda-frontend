import React from 'react';
import { shallow } from 'enzyme';
import SideBar from '../../Components/SideBar/SideBar';

const props = {
  display: true,
  user: {
    firstName: 'Karl',
    lastName: 'Musingo',
    username: 'karl143',
    posts: 21,
    followers: 345,
    following: 52,
    profileImage: '',
  },
};

describe('render SideBar component', () => {
  it('to have input tag', async () => {
    const wrapper = shallow(<SideBar {...props} />);
    expect(wrapper.find('input').length).toBe(1);
  });

  it('to have input tag', async () => {
    const wrapper = shallow(<SideBar {...props} />);
    wrapper.find('input').simulate('change');
    expect(wrapper.find('input').props().checked).toBeFalsy();
  });
});