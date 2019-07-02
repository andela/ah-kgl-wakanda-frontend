import configureMockStore from 'redux-mock-store';
import mockAxios from 'axios';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { unBookmark } from '../../actions/unbookmark';
import {
  UNBOOKMARK_STARTED,
  UNBOOKMARK_SUCCESS,
  UNBOOKMARK_ERROR,
} from '../../actionTypes/bookmark';
import initialState from '../../store/initialState';

const mockStore = configureMockStore([thunk]);
applyMiddleware(promiseMiddleware);

describe('UnBookmark Actions', () => {
  let store;
  const slug = 'articles-slug-12545143';
  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('dispatches UNBOOKMARK_ERROR action', async () => {
    mockAxios.delete.mockImplementationOnce(() =>
      Promise.reject({
        response: { data: { message: 'Please check your internet connection' } },
      }),
    );

    await store.dispatch(unBookmark(slug));
    const actions = await store.getActions();
    expect(actions[0].type).toEqual(UNBOOKMARK_STARTED);
    expect(actions[1].type).toEqual(UNBOOKMARK_ERROR);
  });

  it('dispatches UNBOOKMARK_SUCCESS action', async () => {
    mockAxios.delete.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          message: 'article bookmarked successfully',
        },
      }),
    );

    await store.dispatch(unBookmark(slug));
    const actions = store.getActions();

    expect(actions[0].type).toEqual(UNBOOKMARK_STARTED);
    expect(actions[1].type).toEqual(UNBOOKMARK_SUCCESS);
  });
});
