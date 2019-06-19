import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import updatePassword from '../../actions/updatePassword';

const mockStore = configureMockStore([thunk]);

describe('Action updatePassword', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      updatePassword: { updated: false, error: false, message: '', onupdatePassword: jest.fn() },
    });
  });

  test('Should dispatch the action UPDATE_PASSWORD', async () => {
    mockAxios.put.mockImplementationOnce(() =>
      Promise.resolve({
        data: { id: 1, name: 'karl' },
      }),
    );

    await store.dispatch(updatePassword('Abc12345', 'token'));
    const actions = store.getActions();

    expect.assertions(2);
    expect(actions[0].type).toEqual('UPDATE_PASSWORD_SEND');
    expect(actions[1].type).toEqual('UPDATE_PASSWORD');
  });

  test('Should dispatch the action UPDATE_PASSWORD_ERROR', async () => {
    mockAxios.put.mockImplementationOnce(() =>
      Promise.reject({
        response: { data: { message: 'karl' } },
      }),
    );

    await store.dispatch(updatePassword('email@gmail.com'));
    const actions = store.getActions();

    expect.assertions(3);
    expect(actions[0].type).toEqual('UPDATE_PASSWORD_SEND');
    expect(actions[1].type).toEqual('UPDATE_PASSWORD_ERROR');
    expect(actions[1].payload).toEqual({ message: 'karl' });
  });
});
