import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import rating from '../../actions/rating';

const mockStore = configureMockStore([thunk]);

describe('Action resetPassword', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      resetPassword: { emailSent: false, error: false, message: '', onResetPassword: jest.fn() },
    });
  });

  test('Should dispatch the action SUBMIT_RATING', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: { id: 1, rate: 3 },
      }),
    );

    await store.dispatch(rating(4, 'article_slug'));
    const actions = store.getActions();

    expect.assertions(2);
    expect(actions[0].type).toEqual('SUBMIT_RATING');
    expect(actions[0].payload).toEqual({ id: 1, rate: 3 });
  });

  test('Should dispatch the action RATING_ERROR', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.reject({
        response: { status: 400, data: { message: 'karl' } },
      }),
    );

    await store.dispatch(rating(4, 'article_slug'));

    expect.assertions(0);
  });
});
