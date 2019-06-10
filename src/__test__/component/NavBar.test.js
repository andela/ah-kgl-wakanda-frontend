import React from 'react';
import { shallow, mount } from 'enzyme';
import { NavBar, mapDispatchToProps, mapStateToProps } from '../../Components/NavBar/NavBar';
import initialState from '../../store/initialState';
import { HOME_PATH } from '../../paths';

describe('NavBar component', () => {
  let props;
  let wrapper;
  const e = { preventDefault: jest.fn() };
  beforeEach(() => {
    props = {
      onToggleSideNav: jest.fn(),
      navbar: initialState.navbar,
      currentUser: initialState.currentUser,
      profile: initialState.profile,
      location: { pathname: HOME_PATH },
      displaySearchBox: true,
      onClick: jest.fn(e),
      onChange: jest.fn(e),
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

  it('should render navbar children', () => {
    expect(wrapper).toMatchSnapshot();
    props.currentUser.isAuth = true;
    wrapper = mount(<NavBar {...props} />);
  });

  it('should map state to props', () => {
    const navbar = {
      isDrawerDisplay: false,
    };
    expect(mapStateToProps({ navbar })).toBeDefined();
  });

  it('should trigger onClick event', () => {
    wrapper.find('SearchBox').simulate('click', e);
    expect(e.preventDefault).toHaveBeenCalled();
  });

  it('should trigger toggleNotification event', () => {
    wrapper.find('NotifIcon').simulate('click', e);
    expect(e.preventDefault).toHaveBeenCalled();
  });

  it('should set state `value`', () => {
    const searchText = 'Title for testing';
    wrapper.setState({
      searchText,
    });

    wrapper.find('SearchBox').simulate('change', { target: { value: searchText } });
    expect(wrapper.state('searchText')).toBe(searchText);
  });
});
