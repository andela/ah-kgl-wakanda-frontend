import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ResetPasswordRedux, { ResetPassword } from '../../Containers/ResetPassword/ResetPassword';

const mockStore = configureMockStore([thunk]);

const props = {
  onResetPassword: jest.fn(),
  emailSent: false,
  message: '',
};

describe('render ResetPassword component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      resetPassword: { emailSent: false, error: false, message: '', onResetPassword: jest.fn() },
    });
  });

  it('should have Input component', async () => {
    const wrapper = shallow(<ResetPasswordRedux store={store} {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not have Input component', async () => {
    const props1 = { ...props, emailSent: true };
    const wrapper = shallow(<ResetPassword store={store} {...props1} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Input').length).toBe(0);
  });

  it('should update the email value in the state ', async () => {
    const wrapper = mount(<ResetPassword store={store} {...props} />);
    wrapper
      .find('input')
      .simulate('input', { target: { name: 'email', value: 'email@gmail.com' } });
    expect(wrapper.instance().state.email).toBe('email@gmail.com');
  });

  it('should called a onResetPassword', async () => {
    const wrapper = mount(<ResetPassword store={store} {...props} />);
    wrapper
      .find('input')
      .simulate('input', { target: { name: 'email', value: 'email@gmail.com' } });
    wrapper.find('form').simulate('submit');
    expect(props.onResetPassword).toHaveBeenCalledWith('email@gmail.com');
  });
});
