import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import { createBrowserHistory } from 'history';
import { Signup } from '../../Containers/Signup/Signup';
import { signup } from '../../actions/signupActions';
import signupReducer from '../../reducers/signupReducer';
import { SIGNUP_ERROR, SIGNUP_SUCCESS, SIGNUP_STARTED } from '../../actionTypes/signupTypes';

/**
 * Signup handler
 *
 * @returns {function} then
 */
const onSignup = () => {
  return Promise.resolve({ status: 200 });
};

const props = {
  error: 'none',
  onSignup,
  history: createBrowserHistory,
};

const user = {
  username: 'username',
  email: 'email@email.com',
  password: 'password',
};

const mockStore = configureMockStore([thunk]);

describe('Render Signup component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({ noMatch: 'Passwords do not match' });
  });
  it('to have wrapper class', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <Signup store={store} {...props} />
      </Provider>,
    );

    expect(wrapper.find('.wrapper').length).toBe(1);
  });

  it('to should signup a user', async () => {
    const props1 = {
      ...props,
      history: {
        push: jest.fn(''),
        location: '/',
      },
      user: {
        token: 'token',
      },
    };

    const wrapper = mount(
      <Provider store={store}>
        <Signup store={store} {...props1} />
      </Provider>,
    );
    wrapper.find('input[name="username"]').simulate('input', { target: { value: 'username' } });
    wrapper.find('input[name="email"]').simulate('input', { target: { value: 'grace@gmail.com' } });
    wrapper.find('input[name="password"]').simulate('input', { target: { value: 'Abc123' } });
    wrapper
      .find('input[name="confirmPassword"]')
      .simulate('input', { target: { value: 'Abc123' } });
    wrapper.find('form').simulate('submit');

    expect(wrapper.instance().props.children.props.history.location).toBe('/');
  });

  it('to should return an error when passwords do not match', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <Signup store={store} {...props} />
      </Provider>,
    );
    wrapper.setState({ noMatch: 'Passwords do not match' });
    wrapper.find('input[name="username"]').simulate('input', { target: { value: 'username' } });
    wrapper.find('input[name="email"]').simulate('input', { target: { value: 'grace@gmail.com' } });
    wrapper.find('input[name="password"]').simulate('input', { target: { value: 'Abc123' } });
    wrapper
      .find('input[name="confirmPassword"]')
      .simulate('input', { target: { value: 'no match' } });
    wrapper.find('form').simulate('submit');
    expect(wrapper.instance().state.noMatch).toBe('Passwords do not match');
  });
});

describe('Signup actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      events: {},
    });
  });

  it('should call the signup action with success', () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: { status: 201, user: { token: 'token' } } }),
    );
    store.dispatch(signup(user)).then(res => {
      expect(res.data.status).toBe(201);
    });
  });

  it('should call the signup action with error', () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.reject({
        response: { data: { status: 400, message: 'username must be unique' } },
      }),
    );
    store.dispatch(signup(user)).then(res => {
      expect(res.data.status).toBe(400);
      expect(res.data.message).toBe('username must be unique');
    });
  });

  it('should call the signup action with error', () => {
    mockAxios.post.mockImplementationOnce(() => Promise.reject({ error: 'error' }));
    store.dispatch(signup(user)).then(res => {
      expect(res.error).toBe('error');
    });
  });
});

describe('Signup reducer', () => {
  it('should test the reducer with type SIGNUP_ERROR', () => {
    const state = signupReducer({}, { type: SIGNUP_ERROR, payload: {} });
    expect(state.loading).toBe(false);
  });
});

describe('Signup reducer', () => {
  it('should test the reducer with type SIGNUP_SUCCESS', () => {
    const state = signupReducer({}, { type: SIGNUP_SUCCESS, payload: {} });
    expect(state.loggedIn).toBe(true);
  });
});

describe('Signup reducer', () => {
  it('should test the reducer with type SIGNUP_STARTED', () => {
    const state = signupReducer({}, { type: SIGNUP_STARTED, payload: {} });
    expect(state.loading).toBe(true);
  });
});

describe('Signup reducer', () => {
  it('should test the reducer with type default', () => {
    const state = signupReducer({}, { type: 'default', payload: {} });
    expect(state).toEqual(expect.any(Object));
  });
});
