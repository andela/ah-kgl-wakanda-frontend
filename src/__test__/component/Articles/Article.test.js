import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Route } from 'react-router-dom';
import Article from '../../../Components/Articles/Article';

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

describe('Article', () => {
  it('Should render Article', () => {
    const wrapper = mount(
      <Route>
        <Article list={articles} />
      </Route>,
    );
    expect(wrapper.find('.article').length).toBe(2);
  });
});
