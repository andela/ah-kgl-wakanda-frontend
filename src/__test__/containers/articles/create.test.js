import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import createArticle from '../../../actions/article';
import { CreateArticle } from '../../../Containers/Article/Create/createArticle';
import articleReducer from '../../../reducers/article';
import { PUBLISH_ARTICLE } from '../../../actionTypes/article';

const props = {
  article: {
    title: 'hello',
    body: 'bla bla went dark',
  },
  currentUser: {
    user: {
      username: 'dus',
    },
  },
  navbar: {
    isDrawerDisplay: false,
  },
  history: {
    push: jest.fn(''),
    location: '/articles/hello-world-233591714',
  },
  onPublishArticle: jest.fn(''),
  location: {
    pathname: '/api/articles/new',
  },
};

const { article } = props;

const mockStore = configureMockStore([thunk]);

describe('Create Article component', () => {
  it('to have class article-create', async () => {
    const wrapper = shallow(<CreateArticle {...props} />, { disableLifecycleMethods: true });
    expect(wrapper.find('.article-create').length).toBe(1);
  });
  it('should create article', async () => {
    const wrapper = shallow(<CreateArticle {...props} />, { disableLifecycleMethods: true });
    wrapper.find('input[name="title"]').simulate('input', { target: { value: 'hello world' } });
    const slug = 'hello-world-233591714';
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    });
    expect(wrapper.instance().props.history.location).toBe(`/articles/${slug}`);
  });
});

describe('Create article actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore();
  });
  it('should call the createArticle action with success', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: { status: 201, data: { title: 'hello' } } }),
    );
    await store.dispatch(createArticle(article));
  });
  it('should display an error toast in case of a validation mistake', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.reject({
        response: { data: { status: 400, message: 'title is required' } },
      }),
    );
    await store.dispatch(createArticle(article));
  });
  it('should display a toast when the internet is not available', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.reject({}));
    await store.dispatch(createArticle(article));
  });
});

describe('Publish article reducer', () => {
  it('should test the reducer with type PUBLISH_ARTICLE', () => {
    const state = articleReducer({}, { type: PUBLISH_ARTICLE, payload: article });
    expect(state).toMatchObject(article);
  });
});
