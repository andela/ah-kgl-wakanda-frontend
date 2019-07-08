import checkToken from '../helpers/checkToken';
import img from '../assets/img/blank_profile_pic.png';

const initialState = {
  currentUser: {
    isAuth: !!checkToken(),
    user: checkToken() || {
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
    notification: {
      notificationList: [],
      notificationsCount: 0,
    },
  },
  navbar: {
    isDrawerDisplay: false,
  },
  profile: {
    user: JSON.parse(localStorage.getItem('profile')) || {
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
