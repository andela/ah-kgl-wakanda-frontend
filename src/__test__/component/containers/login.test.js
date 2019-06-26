import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import mockAxios from 'axios';
import { Login } from '../../../Containers/Login/login';
import login from '../../../actions/login';
import loginReducer from '../../../reducers/login';
import { SUBMIT_LOGIN, ERROR_LOGIN } from '../../../actionTypes/login';

/**
 * Signup handler
 *
 * @returns {function} then
 */

/**
 * Signup handler
 *
 * @returns {function} then
 */
const onSubmitLogin = () => Promise.resolve({ status: 201 });

const props = {
  login: [],
  onSubmitLogin,
  history: {
    push: jest.fn(''),
    location: '/',
  },
  location: {
    search: 'url',
  },
};

const user = {
  email: 'email@email.com',
  password: 'password',
};

const mockStore = configureMockStore([thunk]);

describe('Render Login component', () => {
  let store;
  beforeEach(() => {
    store = mockStore();
  });
  it('to have wrapper class', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Login store={store} {...props} />
        </Router>
      </Provider>,
    );
    expect(wrapper.find('.wrapper').length).toBe(1);
  });
  it('should login a user', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Login store={store} {...props} />
        </Router>
      </Provider>,
    );
    wrapper.find('Login').instance().props.history.push = jest.fn();
    wrapper.find('input[name="email"]').simulate('input', { target: { value: 'grace@gmail.com' } });
    wrapper.find('input[name="password"]').simulate('input', { target: { value: 'Abc123' } });
    wrapper.find('form').simulate('submit');
    expect(wrapper.find('Login').instance().props.history.location).toBe('/');
  });
});

describe('Login actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore();
  });
  it('should call the login action with success', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: { status: 201, user: { token: 'token' } } }),
    );
    await store.dispatch(login(user));
  });
  it('should call the login action with error', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.reject({
        response: { data: { status: 400, message: 'username must be unique' } },
      }),
    );
    await store.dispatch(login(user));
  });
});

describe('Signup reducer', () => {
  it('should test the reducer with type SIGNUP_ERROR', () => {
    const state = loginReducer({}, { type: ERROR_LOGIN, payload: 'Wrong credentials' });
    expect(state.errorMessage).toBe('Wrong credentials');
  });
  it('should test the reducer with type SIGNUP_SUCCESS', () => {
    const state = loginReducer({}, { type: SUBMIT_LOGIN, payload: { user } });
    expect(state.user.user.email).toBe('email@email.com');
  });
  it('should test the reducer with type default', () => {
    const state = loginReducer({}, { type: 'default', payload: {} });
    expect(state).toEqual(expect.any(Object));
  });
});
