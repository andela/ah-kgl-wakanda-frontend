import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import TopArticle from '../../../Components/Articles/TopArticle';

const mockStore = configureMockStore();
const store = mockStore({});

const props = {
  currentUser: { isAuth: true },
  bookmarkArticles: [],
  list: [],
  articles: [
    {
      title: 'The title of an article',
      description: 'The description',
      favoritesCount: 10,
      commentCounts: 3,
      readTime: '10 min',
      id: 1,
      Ratings: [{ rate: 3 }],
      slug: 'The-title',
    },
  ],
};

describe('TopArticle', () => {
  it('Should render TopArticle', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Route>
          <TopArticle {...props} />
        </Route>
      </Provider>,
    );
    expect(wrapper.find('.article').length).toBe(0);
  });
});
