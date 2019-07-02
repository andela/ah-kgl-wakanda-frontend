import configureMockStore from 'redux-mock-store';
import mockAxios from 'axios';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { bookmark } from '../../actions/bookmark';
import { BOOKMARK_STARTED, BOOKMARK_SUCCESS, BOOKMARK_ERROR } from '../../actionTypes/bookmark';
import initialState from '../../store/initialState';

const mockStore = configureMockStore([thunk]);
applyMiddleware(promiseMiddleware);

describe('Bookmark Actions', () => {
  let store;
  const slug = 'articles-slug-12545143';
  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('dispatches BOOKMARK_ERROR action', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.reject({
        response: { data: { message: 'Please check your internet connection' } },
      }),
    );

    await store.dispatch(bookmark(slug));
    const actions = await store.getActions();
    expect(actions[0].type).toEqual(BOOKMARK_STARTED);
    expect(actions[1].type).toEqual(BOOKMARK_ERROR);
  });

  it('dispatches BOOKMARK_SUCCESS action', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          message: 'article bookmarked successfully',
        },
      }),
    );

    await store.dispatch(bookmark(slug));
    const actions = store.getActions();

    expect(actions[0].type).toEqual(BOOKMARK_STARTED);
    expect(actions[1].type).toEqual(BOOKMARK_SUCCESS);
  });
});
