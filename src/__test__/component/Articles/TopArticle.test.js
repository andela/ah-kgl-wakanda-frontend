import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Route } from 'react-router-dom';
import TopArticle from '../../../Components/Articles/TopArticle';

const articles = [
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
];

describe('TopArticle', () => {
  it('Should render TopArticle', () => {
    const wrapper = mount(
      <Route>
        <TopArticle list={articles} />
      </Route>,
    );
    expect(wrapper.find('.article').length).toBe(1);
  });
});
