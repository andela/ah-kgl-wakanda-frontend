import checkToken from '../helpers/checkToken';

const initialState = {
  currentUser: {
    isAuth: !!checkToken(),
    user: checkToken(),
    notification: {
      notificationList: [],
      notificationsCount: 0,
    },
  },
  navbar: {
    isDrawerDisplay: false,
  },
  profile: {
    user: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      bio: null,
      image: img,
      followers: 0,
      following: 0,
      articles: 0,
      allowEmailNotification: false,
    },
  },
};

export default initialState;
