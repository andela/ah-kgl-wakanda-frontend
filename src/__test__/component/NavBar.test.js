import React from 'react';
import { shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import { NavBar, mapDispatchToProps, mapStateToProps } from '../../Components/NavBar/NavBar';
import initialState from '../../store/initialState';
import { HOME_PATH } from '../../paths';

describe('NavBar component', () => {
  let props;
  let wrapper;
  const e = { preventDefault: jest.fn() };
  const history = createMemoryHistory();
  beforeEach(() => {
    props = {
      onToggleSideNav: jest.fn(),
      navbar: initialState.navbar,
      currentUser: {
        isAuth: true,
        user: {
          username: 'test',
        },
        notification: {
          notificationList: [],
          notificationsCount: 0,
        },
      },
      profile: initialState.profile,
      location: { pathname: HOME_PATH },
      history,
      displaySearchBox: true,
      onClick: jest.fn(e),
      onChange: jest.fn(e),
      onSearch: jest.fn(e),
    };
    wrapper = shallow(<NavBar {...props} />);
  });

  it('should render without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should map dispatch to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onToggleSideNav();
    expect(dispatch).toHaveBeenCalled();
  });

  it('should execute instance methods', () => {
    const isDrawerDisplay = false;
    const instance = wrapper.instance();
    instance.toggleSideNav(isDrawerDisplay);
    expect(props.onToggleSideNav).toHaveBeenCalled();
  });

  it('should map state to props', () => {
    const navbar = {
      isDrawerDisplay: false,
    };
    expect(mapStateToProps({ navbar })).toBeDefined();
  });

  it('should set state `value`', () => {
    const searchText = 'Title for testing';
    wrapper.setState({
      searchText,
    });

    wrapper.find('Connect(SearchBox)').simulate('change', { target: { value: searchText } });
    expect(wrapper.state('searchText')).toBe(searchText);
  });

  it('should display auth button', () => {
    const newProps = {
      ...props,
      displaySearchBox: false,
      currentUser: {
        isAuth: false,
        user: {
          username: 'test',
        },
        notification: {
          notificationList: [],
          notificationsCount: 0,
        },
      },
    };

    wrapper = shallow(<NavBar {...newProps} />);
  });
});
