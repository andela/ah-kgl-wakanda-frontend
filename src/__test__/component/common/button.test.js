import React from 'react';
import { shallow, mount } from 'enzyme';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../Components/Common/Button/Button';

const props = {
  text: 'button',
  color: '#222',
};

const mockedEvent = {
  target: {
    style: {
      opacity: 1,
    },
  },
};

describe('Button component', () => {
  it('Has a div tag', async () => {
    const wrapper = shallow(<Button {...props} />);
    expect(wrapper.find('div').length).toBe(1);
  });
  it('Displays an outline button', async () => {
    const wrapper = mount(<Button text="button" outline full />);
    expect(wrapper.find('div').prop('style').color).toBe('#f46036');
  });
  it('Displays a disabled button', async () => {
    const button = mount(<Button text="button" disabled />);
    expect(button.find('div').prop('style').opacity).toBe(0.8);
  });
  it('Displays a button with an icon', async () => {
    const button = mount(<Button text="button" loading icon={faCoffee} />);
    expect(button.find('.ah-icon').length).toBe(2);
  });
  it('Displays social buttons', async () => {
    const googleButton = mount(<Button social="google" />);
    const facebookButton = mount(<Button social="facebook" />);
    const twitterButton = mount(<Button social="twitter" />);
    expect(googleButton.find('.social').length).toBe(1);
    expect(facebookButton.find('.social').length).toBe(1);
    expect(twitterButton.find('.social').length).toBe(1);
  });
  it('Should fail to display a social button', async () => {
    const github = mount(<Button social="github" />);
    expect(github.find('.social').length).toBe(1);
  });
  it('Should change the opacity', async () => {
    const button = shallow(<Button text="button" />);
    button.find('div').simulate('mousedown', mockedEvent);
    expect(button.find('div').prop('style').opacity).toBe(1);
  });
});
