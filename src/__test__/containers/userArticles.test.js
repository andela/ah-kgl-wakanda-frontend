import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import { fetchUserArticles } from '../../actions/fetchArticles';
import reducer from '../../reducers/fetchArticles';
import { UserArticles } from '../../Containers/UserArticles/UserArticles';

import { FETCH_USER_ARTICLES } from '../../actionTypes/fetchArticles';

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
const onFetchUserArticles = () => {
  return Promise.resolve({
    status: 200,
    response: {
      data: articles,
    },
  });
};

const props = {
  userArticles: [],
  currentUser: {},
  onFetchUserArticles,
};

const mockStore = configureMockStore([thunk]);

describe('Renders UserArticles', () => {
  it('to have page class', async () => {
    const wrapper = shallow(<UserArticles {...props} />);
    wrapper.instance().componentDidMount();
    expect(wrapper.find('.page').length).toBe(1);
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
    store.dispatch(fetchUserArticles()).then(res => {
      expect(res.status).toBe(200);
    });
  });
});

describe('fetch reducer', () => {
  it('should test the reducer with type FETCH_ARTICLES_ERROR', () => {
    const state = reducer({}, { type: FETCH_USER_ARTICLES, payload: {} });
    expect(state.loading).toBe(false);
  });
});
