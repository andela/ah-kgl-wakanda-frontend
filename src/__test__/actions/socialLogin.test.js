import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { socialLogin, loginWithTwitter } from '../../actions/socialLogin';

const mockStore = configureMockStore([thunk]);

describe('Action socialLogin', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      socialLogin: { emailSent: false, error: false, message: '', onResetPassword: jest.fn() },
    });
  });

  test('Should dispatch the action SUBMIT_LOGIN', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          user: {
            token: 'token',
            username: 'username',
          },
        },
      }),
    );

    await store.dispatch(socialLogin('access_token', 'google', 'login'));
    const actions = store.getActions();

    expect.assertions(2);
    expect(actions[0].type).toEqual('SUBMIT_LOGIN');
    expect(actions[0].payload.token).toEqual('token');
  });

  test('Should dispatch the action SIGNUP_SUCCESS', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          user: {
            token: 'token',
            username: 'username',
          },
        },
      }),
    );

    await store.dispatch(socialLogin('access_token', 'google', 'signup'));
    const actions = store.getActions();

    expect.assertions(2);
    expect(actions[0].type).toEqual('SIGNUP_SUCCESS');
    expect(actions[0].payload.token).toEqual('token');
  });

  test('Should dispatch the action ERROR_LOGIN', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.reject({
        response: { data: { message: 'error message' } },
      }),
    );

    await store.dispatch(socialLogin('access_token', 'google'));
    const actions = store.getActions();

    expect.assertions(2);
    expect(actions[0].type).toEqual('ERROR_LOGIN');
    expect(actions[0].payload).toEqual('error message');
  });

  describe('Action loginWithTwitter', () => {
    test('Should dispatch the action SUBMIT_LOGIN', async () => {
      await store.dispatch(loginWithTwitter('token', 'username'));
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual('SUBMIT_LOGIN');
      expect(actions[0].payload.token).toEqual('token');
    });
  });
});
