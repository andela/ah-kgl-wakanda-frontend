import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import UpdatePasswordRedux, {
  UpdatePassword,
} from '../../Containers/UpdatePassword/UpdatePassword';

const mockStore = configureMockStore([thunk]);

const props = {
  onUpdatePassword: jest.fn(),
  updated: false,
  message: '',
  match: { params: { token: 'token' } },
};

describe('render UpdatePassword component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      updatePassword: { emailSent: false, error: false, message: '', onUpdatePassword: jest.fn() },
    });
  });

  it('should have Input component', async () => {
    const wrapper = shallow(<UpdatePasswordRedux store={store} {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not have Input component', async () => {
    const props1 = { ...props, updated: true };
    const wrapper = shallow(<UpdatePassword store={store} {...props1} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Input').length).toBe(0);
  });

  it('should update the password value in the state ', async () => {
    const props1 = { ...props, match: { params: { token: 'token' } } };
    const wrapper = mount(<UpdatePassword store={store} {...props1} />);
    wrapper
      .find('#password')
      .simulate('input', { target: { name: 'password', value: 'Abc12345' } });
    expect(wrapper.instance().state.password).toBe('Abc12345');
  });

  it('should update the confirm password value in the state ', async () => {
    const props1 = { ...props, match: { params: { token: 'token' } } };
    const wrapper = mount(<UpdatePassword store={store} {...props1} />);
    wrapper
      .find('#confirmPassword')
      .simulate('input', { target: { name: 'confirmPassword', value: 'Abc12345' } });
    expect(wrapper.instance().state.confirmPassword).toBe('Abc12345');
  });

  it('should called a onUpdatePassword', async () => {
    const wrapper = mount(<UpdatePassword store={store} {...props} />);
    wrapper
      .find('#password')
      .simulate('input', { target: { name: 'password', value: 'Abc12345' } });
    wrapper
      .find('#confirmPassword')
      .simulate('input', { target: { name: 'confirmPassword', value: 'Abc12345' } });
    wrapper.find('form').simulate('submit');
    expect(props.onUpdatePassword).toHaveBeenCalledWith('Abc12345', props.match.params.token);
  });

  it('should return an error when the two password are not the same', async () => {
    const wrapper = mount(<UpdatePassword store={store} {...props} />);
    wrapper
      .find('#password')
      .simulate('input', { target: { name: 'password', value: 'Abc12345' } });
    wrapper
      .find('#confirmPassword')
      .simulate('input', { target: { name: 'confirmPassword', value: 'Xyz12375' } });
    wrapper.find('form').simulate('submit');
    expect(wrapper.instance().state.errorMessage).toBe(
      'Password is different from Confirm Password',
    );
  });
});
