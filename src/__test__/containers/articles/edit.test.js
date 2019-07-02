import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import { updateArticle } from '../../../actions/article';
import { EditArticle } from '../../../Containers/Article/Edit/editArticle';

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
  profile: {
    user: {
      username: 'dus',
    },
  },
  navbar: {
    isDrawerDisplay: false,
  },
  match: {
    params: {
      slug: 'hello-world-233591714',
    },
  },
  history: {
    push: jest.fn(''),
    location: '/articles/hello-world-233591714',
  },
  onUpdateArticle: jest.fn(''),
  location: {
    pathname: '/api/articles/new',
  },
};

const { article } = props;

const mockStore = configureMockStore([thunk]);

describe('Edit Article component', () => {
  it('to have class article-edit', async () => {
    const wrapper = shallow(<EditArticle {...props} />, { disableLifecycleMethods: true });
    expect(wrapper.find('.article-edit').length).toBe(1);
  });
  it('should Edit article', async () => {
    const wrapper = shallow(<EditArticle {...props} />, { disableLifecycleMethods: true });
    wrapper
      .find('input[name="title"]')
      .simulate('input', { target: { name: 'title' }, value: 'hello world' });
    const slug = 'hello-world-233591714';
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    });
    expect(wrapper.instance().props.history.location).toBe(`/articles/${slug}`);
  });
});

describe('Edit article actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore();
  });
  it('should call the updateArticle action with success', async () => {
    mockAxios.put.mockImplementationOnce(() =>
      Promise.resolve({ data: { status: 201, data: { title: 'hello' } } }),
    );
    await store.dispatch(updateArticle(article));
  });
  it('should display an error toast in case of a validation mistake', async () => {
    mockAxios.put.mockImplementationOnce(() =>
      Promise.reject({
        response: { data: { status: 400, message: 'title is required' } },
      }),
    );
    await store.dispatch(updateArticle(article));
  });
  it('should display a toast when the internet is not available', async () => {
    mockAxios.put.mockImplementationOnce(() => Promise.reject({}));
    await store.dispatch(updateArticle(article));
  });
});
