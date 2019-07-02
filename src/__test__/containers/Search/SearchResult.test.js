import React from 'react';
import { shallow } from 'enzyme';
import { SearchResult, mapStateToProps } from '../../../Containers/Search/SearchResult';

describe('SearchResult component', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      searchFilter: {
        articles: [
          {
            slug: 'slug',
            id: 1,
            title: 'test',
            description: 'test',
            User: {
              username: 'username',
            },
            images: ['image.png'],
            date: '12 jun 2019',
          },
        ],
      },
    };
    wrapper = shallow(<SearchResult {...props} />);
  });

  it('should render SearchResult component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render NotFound Component', () => {
    const newProps = {
      searchFilter: {
        ...props,
        articles: [],
      },
    };
    shallow(<SearchResult {...newProps} />);
  });

  it('should map state to props', () => {
    const state = {
      navbar: {},
      searchFilter: {},
      profile: {},
      currentUser: {},
    };
    expect(mapStateToProps(state)).toBeDefined();
  });
});
