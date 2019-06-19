import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import mockAxios from 'axios';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ProfileContainer, mapDispatchToProps } from '../../Containers/Profile/profileContainer';
import initialState from '../../store/initialState';
import { viewProfile, editProfile } from '../../actions/profileActions';

const e = { preventDefault: jest.fn() };
const props = {
  currentUser: initialState.currentUser,
  profile: {
    user: {
      username: 'giselei',
      firstname: 'abana',
      lastname: 'ni beza',
      email: 'gisele.iradukunda@andela.com',
      bio: 'cyane man',
      image:
        'http://res.cloudinary.com/ah-wakanda/image/upload/v1561649492/ax27ojnfvsgmoosgcgyi.jpg',
      follows: 0,
      followings: 0,
      articles: 0,
      allowEmailNotification: false,
    },
  },
  onViewProfile: jest.fn(),
  onEditProfile: jest.fn(e),
  location: {
    pathname: '/api/user/giselei',
  },
};
const { profile } = props;
const mockStore = configureMockStore([thunk]);
const store = mockStore(initialState);
let wrapper;
describe('Renders view Profile Component', () => {
  it('Should render the <ProfileContainer/>', () => {
    wrapper = shallow(
      <Provider store={store}>
        <ProfileContainer {...profile} />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.find('input[name="email"]');
    wrapper.find('input[name="firstname"]');
    wrapper.find('input[name="lastname"]');
    wrapper.find('form');
  });
  it('Should map dispatch to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onViewProfile(profile.user.username);
    expect(dispatch).toHaveBeenCalled();
  });
  it('Should map dispatch to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onEditProfile(profile.user.username);
    expect(dispatch).toHaveBeenCalled();
  });
});
describe('View & edit profile actions', () => {
  it('should successfully call the viewProfile action', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          status: 200,
          profile: {
            username: 'giselei',
            firstname: 'abana',
            lastname: 'ni beza',
            email: 'gisele.iradukunda@andela.com',
            bio: 'cyane man',
            image:
              'http://res.cloudinary.com/ah-wakanda/image/upload/v1561649492/ax27ojnfvsgmoosgcgyi.jpg',
            follows: 0,
            followings: 0,
            articles: 0,
          },
        },
      }),
    );
    await store.dispatch(viewProfile(profile.user.username));
  });
  it('should successfully call the editProfile action', async () => {
    mockAxios.put.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          status: 200,
          profile: {
            username: 'giselei',
            firstname: 'abana',
            lastname: 'ni beza',
            email: 'gisele.iradukunda@andela.com',
            bio: 'cyane man',
            image:
              'http://res.cloudinary.com/ah-wakanda/image/upload/v1561649492/ax27ojnfvsgmoosgcgyi.jpg',
            follows: 0,
            followings: 0,
            articles: 0,
          },
        },
      }),
    );
    await store.dispatch(editProfile(profile, profile.user.username));
  });
});
