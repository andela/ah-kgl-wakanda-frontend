import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import { fetchArticles, fetchNewFeed, fetchNewUserArticles } from '../../actions/fetchArticles';
import reducer from '../../reducers/fetchArticles';
import { Home } from '../../Containers/Home/Home';

import {
  FETCH_ARTICLES_STARTED,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
  NEW_FEED,
  NEW_USER_ARTICLES,
} from '../../actionTypes/fetchArticles';

const articles = [
  {
    title: 'The title of an article',
    images: ['url'],
    description: 'The description',
    favoritesCount: 10,
    commentCounts: 3,
    readTime: '10 min',
    id: 1,
    Ratings: [{ rate: 3 }],
    slug: 'The-title',
  },
];

/**
 * Fetch articles
 *
 * @returns {function} then
 */
const onFetchArticles = () => {
  return Promise.resolve({
    status: 200,
    response: {
      data: articles,
    },
  });
};

const props = {
  data: [],
  loggedIn: true,
  onFetchArticles,
  onUpdateIsAuth: jest.fn(),
  onFetchNewFeed: jest.fn(),
  onSignupError: () => null,
  viewBookmarkArticles: {
    bookmarkArticles: [],
  },
  onFetchBookmarkedArticles: jest.fn(),
};

const mockStore = configureMockStore([thunk]);

describe('Renders Home', () => {
  it('to have home-page Id', async () => {
    const wrapper = shallow(<Home {...props} />);
    wrapper.instance().componentDidMount();
    // const customEvent = new Event('scroll');
    wrapper.first().simulate('scroll');
    wrapper.first().simulate('scroll');
    wrapper.first().simulate('scroll');
    wrapper.first().simulate('scroll');
    wrapper.first().simulate('scroll');
    wrapper.first().simulate('scroll');
    wrapper.first().simulate('scroll');
    wrapper.first().simulate('scroll');
    wrapper.first().simulate('scroll');
    wrapper.first().simulate('scroll');
    wrapper.first().simulate('scroll');
    wrapper.first().simulate('scroll');
    wrapper.first().simulate('scroll');
    wrapper.first().simulate('scroll');
    wrapper.first().simulate('scroll');
    expect(wrapper.find('#home-page').length).toBe(1);
  });
});

describe('Fetch actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      events: {},
    });
  });

  it('should call the fetch action with success', () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { data: { articles } }, status: 200 }),
    );
    store.dispatch(fetchArticles()).then(res => {
      expect(res.status).toBe(200);
    });
  });

  it('should call the fetch newFeed action with success', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { data: { articles } }, status: 200 }),
    );

    await store.dispatch(fetchNewFeed(1, 1));
    const actions = store.getActions();

    expect.assertions(1);
    expect(actions[0].type).toEqual('FETCH_ARTICLES_STARTED');
  });

  it('should call the fetch newFeed action with success but with empty response', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { data: { articles: [] } }, status: 200 }),
    );
    await store.dispatch(fetchNewFeed(1, 1));
    const actions = store.getActions();

    expect.assertions(1);
    expect(actions[0].type).toEqual('FETCH_ARTICLES_STARTED');
  });

  it('should call the fetch newFeed action with success but with empty response', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { data: { articles: [] } }, status: 200 }),
    );
    await store.dispatch(fetchNewUserArticles('username', 1, 1));
    const actions = store.getActions();

    expect.assertions(1);
    expect(actions[0].type).toEqual('FETCH_ARTICLES_STARTED');
  });

  it('should call the fetch newFeed action with success but with empty response', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { data: { articles } }, status: 200 }),
    );
    await store.dispatch(fetchNewUserArticles('username', 1, 1));
    const actions = store.getActions();

    expect.assertions(1);
    expect(actions[0].type).toEqual('FETCH_ARTICLES_STARTED');
  });

  it('should call the signup action with error', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.reject({
        response: { data: { status: 400, message: 'Error' } },
      }),
    );
    await store.dispatch(fetchNewUserArticles('username', 1, 1));
    const actions = store.getActions();

    expect.assertions(1);
    expect(actions[0].type).toEqual('FETCH_ARTICLES_STARTED');
  });
  it('should call the signup action with error', () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.reject({
        response: { data: { status: 400, message: 'Error' } },
      }),
    );
    store.dispatch(fetchArticles()).then(res => {
      expect(res.data.status).toBe(400);
      expect(res.data.message).toBe('Error');
    });
  });

  it('should call the signup action with error', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.reject({
        response: { data: { status: 400, message: 'Error' } },
      }),
    );
    await store.dispatch(fetchNewFeed(1, 1));
    const actions = store.getActions();

    expect.assertions(1);
    expect(actions[0].type).toEqual('FETCH_ARTICLES_STARTED');
  });

  it('should call the signup action with error', () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.reject({ error: 'Please check your internet connection' }),
    );
    store.dispatch(fetchArticles()).then(res => {
      expect(res.error).toBe('Please check your internet connection');
    });
  });
});

describe('fetch reducer', () => {
  it('should test the reducer with type FETCH_ARTICLES_ERROR', () => {
    const state = reducer({}, { type: FETCH_ARTICLES_ERROR, payload: {} });
    expect(state.loading).toBe(false);
  });
});

describe('fetch reducer', () => {
  it('should test the reducer with type FETCH_ARTICLES_SUCCESS', () => {
    const state = reducer({}, { type: FETCH_ARTICLES_SUCCESS, payload: {} });
    expect(state.loading).toBe(false);
  });
});

describe('fetch reducer', () => {
  it('should test the reducer with type FETCH_ARTICLES_STARTED', () => {
    const state = reducer({}, { type: FETCH_ARTICLES_STARTED, payload: {} });
    expect(state.loading).toBe(true);
  });
});

describe('fetch reducer', () => {
  it('should test the reducer with type default', () => {
    const state = reducer({}, { type: 'default', payload: {} });
    expect(state).toEqual(expect.any(Object));
  });
});

describe('pagination reducer', () => {
  it('should test the reducer with type default', () => {
    const state = reducer({ newFeed: [] }, { type: NEW_FEED, payload: [] });
    expect(state).toEqual(expect.any(Object));
  });
});

describe('pagination reducer', () => {
  it('should test the reducer with type default', () => {
    const state = reducer({ newUserArticles: [] }, { type: NEW_USER_ARTICLES, payload: [] });
    expect(state).toEqual(expect.any(Object));
  });
});
