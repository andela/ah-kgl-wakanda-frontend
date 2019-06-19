import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import resetPassword from '../../actions/resetPassword';

const mockStore = configureMockStore([thunk]);

describe('Action resetPassword', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      resetPassword: { emailSent: false, error: false, message: '', onResetPassword: jest.fn() },
    });
  });

  test('Should dispatch the action RESET_PASSWORD', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: { id: 1, name: 'karl' },
      }),
    );

    await store.dispatch(resetPassword('email@gmail.com'));
    const actions = store.getActions();

    expect.assertions(4);
    expect(actions[0].type).toEqual('RESET_PASSWORD_SEND');
    expect(actions[1].type).toEqual('RESET_PASSWORD');
    expect(actions[0].payload).toEqual('email@gmail.com');
    expect(actions[1].payload).toEqual('email@gmail.com');
  });

  test('Should dispatch the action RESET_PASSWORD_ERROR', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.reject({
        response: { data: { message: 'karl' } },
      }),
    );

    await store.dispatch(resetPassword('email@gmail.com'));
    const actions = store.getActions();

    expect.assertions(4);
    expect(actions[0].type).toEqual('RESET_PASSWORD_SEND');
    expect(actions[0].payload).toEqual('email@gmail.com');
    expect(actions[1].type).toEqual('RESET_PASSWORD_ERROR');
    expect(actions[1].payload).toEqual({ message: 'karl' });
  });
});
