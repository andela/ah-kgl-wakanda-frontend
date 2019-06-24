import configureMockStore from 'redux-mock-store';
import mockAxios from 'axios';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { search } from '../../actions/search';
import { SEARCH_STARTED, SEARCH_SUCCESS, SEARCH_ERROR } from '../../actionTypes/search';
import initialState from '../../store/initialState';

const mockStore = configureMockStore([thunk]);
applyMiddleware(promiseMiddleware);

describe('Search Actions', () => {
  let store;
  const url = `/api/search?title=demo`;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('dispatches SEARCH_ERROR action', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.reject({
        response: { data: { message: 'Please check your internet connection' } },
      }),
    );

    await store.dispatch(search(url));
    const actions = await store.getActions();
    expect(actions[0].type).toEqual(SEARCH_STARTED);
    expect(actions[1].type).toEqual(SEARCH_ERROR);
  });

  it('dispatches SEARCH_SUCCESS action', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          data: {
            articles: [
              {
                id: 1,
                body: 'lorem ipsum',
              },
            ],
          },
        },
      }),
    );

    await store.dispatch(search(url));
    const actions = store.getActions();

    expect(actions[0].type).toEqual(SEARCH_STARTED);
    expect(actions[1].type).toEqual(SEARCH_SUCCESS);
  });
});
