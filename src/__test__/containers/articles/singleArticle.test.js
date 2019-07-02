import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import { getArticle, deleteArticle } from '../../../actions/article';
import triggerSystem from '../../../actions/userInfo';
import { SingleArticle } from '../../../Containers/Article/Single/singleArticle';
import articleReducer from '../../../reducers/article';
import { GET_SINGLE_ARTICLE, DELETE_SINGLE_ARTICLE } from '../../../actionTypes/article';
import { NOT_FOUND, SUCCESS_MESSAGE } from '../../../actionTypes/system';

const props = {
  article: {
    title: 'hello',
    body: '{"p":{"value":"bla bla went dark"}}',
    images: 'image/path',
  },
  currentUser: {
    user: {
      username: 'dus',
    },
  },
  system: {
    notFound: false,
  },
  history: {
    push: jest.fn(''),
    location: '/articles/hello-world-233591714',
  },
  onGetArticle: jest.fn(''),
  location: {
    pathname: '/api/articles/new',
  },
  match: {
    params: {
      slug: 'hello-world-233591714',
    },
  },
};

const systemInitialState = {
  notFound: {
    status: false,
    attribute: 'Page',
  },
  progressBar: 0,
  noInternet: false,
  successMessage: {
    status: false,
    message: '',
  },
};

const { article } = props;

const { slug } = props.match.params;
const mockStore = configureMockStore([thunk]);

describe('Single Article Component', () => {
  it('to have id single-article', async () => {
    const wrapper = shallow(<SingleArticle {...props} />);
    expect(wrapper.find('#single-article').length).toBe(1);
  });
});

describe('Get one article actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore();
  });
  it('should call the createArticle action with success', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { status: 200, data: { title: 'hello' } } }),
    );
    await store.dispatch(getArticle(slug));
  });
  it('should redirect to not-found page when the article is not found', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.reject({
        response: { status: 404, message: 'article not found' },
      }),
    );
    await store.dispatch(getArticle(slug));
  });
  it('should get author information', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { status: 200, profile: {} },
      }),
    );
    await store.dispatch(triggerSystem('dus'));
  });
  it('should fail to get author information', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.reject({
        response: { data: { status: 404, message: 'User not found' } },
      }),
    );
    await store.dispatch(triggerSystem('dus'));
  });
  it('should throw an error where the connection is lost', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.reject({}));
    await store.dispatch(triggerSystem('dus'));
  });
});

describe('Delete article actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore();
  });
  it('should call the delete action with success', async () => {
    mockAxios.delete.mockImplementationOnce(() =>
      Promise.resolve({ data: { status: 201, message: 'article successfully deleted' } }),
    );
    await store.dispatch(deleteArticle(slug));
  });
  it('should display an error toast in case of a validation mistake', async () => {
    mockAxios.delete.mockImplementationOnce(() =>
      Promise.reject({
        response: { data: { status: 401, message: 'this is not your article' } },
      }),
    );
    await store.dispatch(deleteArticle(slug));
  });
  it('should display a toast when the internet is not available', async () => {
    mockAxios.delete.mockImplementationOnce(() => Promise.reject({}));
    await store.dispatch(deleteArticle(slug));
  });
});

describe('Get one article reducer', () => {
  it('should test the reducer with type GET_SINGLE_ARTICLE', () => {
    const state = articleReducer({}, { type: GET_SINGLE_ARTICLE, payload: article });
    expect(state).toMatchObject(article);
  });
});

describe('Delete article reducer', () => {
  it('should test the reducer with type DELETE_SINGLE_ARTICLE', () => {
    const state = articleReducer({}, { type: DELETE_SINGLE_ARTICLE, payload: {} });
    expect(state).toMatchObject({});
  });
});

describe('system reducer', () => {
  it('should test the reducer with type NOT_FOUND', () => {
    const payload = {
      notFound: {
        status: true,
        attribute: 'Article',
      },
    };
    const state = articleReducer(systemInitialState, { type: NOT_FOUND, payload });
    expect(state).toMatchObject(systemInitialState);
  });
});

describe('system reducer', () => {
  it('should test the reducer with type NOT_FOUND', () => {
    const payload = {
      successMessage: {
        status: true,
        message: 'article successfully deleted',
      },
    };
    const state = articleReducer(systemInitialState, { type: SUCCESS_MESSAGE, payload });
    expect(state).toMatchObject(systemInitialState);
  });
});
