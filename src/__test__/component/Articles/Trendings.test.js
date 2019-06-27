import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Route } from 'react-router-dom';
import Trendings from '../../../Components/Articles/Trendings';

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

describe('Trendings', () => {
  it('Should render Trendings', () => {
    const wrapper = mount(
      <Route>
        <Trendings list={articles} />
      </Route>,
    );
    expect(wrapper.find('.article').length).toBe(2);
  });
});
