import configureMockStore from 'redux-mock-store';
import mockAxios from 'axios';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { viewBookmarked } from '../../actions/getBookmarked';
import { VIEW_BOOKMARKED_STARTED, VIEW_BOOKMARKED_ERROR } from '../../actionTypes/viewBookmarked';
import initialState from '../../store/initialState';

const mockStore = configureMockStore([thunk]);
applyMiddleware(promiseMiddleware);

describe('View Bookmarked Actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('dispatches VIEW_BOOKMARKED_ERROR action', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.reject({
        response: { data: { message: 'Please check your internet connection' } },
      }),
    );

    await store.dispatch(viewBookmarked());
    const actions = await store.getActions();
    expect(actions[0].type).toEqual(VIEW_BOOKMARKED_STARTED);
    expect(actions[1].type).toEqual(VIEW_BOOKMARKED_ERROR);
  });

  it('dispatches VIEW_BOOKMARKED_SUCCESS action', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {},
      }),
    );

    await store.dispatch(viewBookmarked());
    const actions = store.getActions();

    expect(actions[0].type).toEqual(VIEW_BOOKMARKED_STARTED);
  });
});
