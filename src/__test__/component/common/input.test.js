import React from 'react';
import { shallow } from 'enzyme';
import Input from '../../../Components/Common/input/input';

const props = {
  type: 'text',
  name: 'firstname',
  label: 'firstname',
  required: false,
  placeholder: 'firstname',
  onType: jest.fn(),
};

const mockedEvent = {
  target: {
    ...props,
    value: 'fi',
  },
};

describe('render Input component', () => {
  it('to have input tag', async () => {
    const wrapper = shallow(<Input {...props} />);
    expect(wrapper.find('input').length).toBe(1);
  });

  it('should display a validation error when length is under 3', async () => {
    const wrapper = shallow(<Input {...props} />);
    wrapper.find('input').simulate('blur', mockedEvent);
    expect(wrapper.find('.error-message').text()).toBe(
      'firstname length must be at least 3 characters long',
    );
  });

  it('should return an email validation error message', async () => {
    const wrapper = shallow(<Input {...props} />);
    const mockedEventEmail = {
      target: { ...mockedEvent.target, name: 'email', type: 'email', value: 'agggg.com' },
    };
    wrapper.find('input').simulate('blur', mockedEventEmail);
    expect(wrapper.find('.error-message').text()).toBe('email must be a valid email');
  });

  it('should return a password error message', async () => {
    const wrapper = shallow(<Input {...props} />);
    const mockedEventPassword = {
      target: { ...mockedEvent.target, name: 'password', type: 'password', value: 'agggg' },
    };
    wrapper.find('input').simulate('blur', mockedEventPassword);
    expect(wrapper.find('.error-message').text()).toBe(
      'Your password must have at least 6 characters and contain 1 Uppercase, 1 Lowercase, 1 number',
    );
  });

  it('should return a default validation error message', async () => {
    const wrapper = shallow(<Input {...props} />);
    const mockedEventDefault = {
      target: { ...mockedEvent.target, name: 'search', type: 'search', value: 'agggg' },
    };
    wrapper.find('input').simulate('blur', mockedEventDefault);
    expect(wrapper.find('.error-message').text()).toBe('search is not allowed');
  });

  it('should not return any validation error message', async () => {
    const wrapper = shallow(<Input {...props} />);
    const mockedEventValid = {
      target: { ...mockedEvent.target, value: 'hadadus' },
    };
    wrapper.find('input').simulate('blur', mockedEventValid);
    expect(wrapper.find('.error-message')).toMatchObject({});
  });

  it('should save input to state', async () => {
    const wrapper = shallow(<Input {...props} />);
    const mockedEventValid = {
      target: { ...mockedEvent.target, value: 'hadadus' },
      preventDefault: jest.fn(),
    };
    wrapper.find('input').simulate('change', mockedEventValid);
    expect(wrapper.find('.error-message')).toMatchObject({});
  });
});
