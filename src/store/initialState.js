import checkToken from '../helpers/checkToken';
import img from '../assets/img/blank_profile_pic.png';

const initialState = {
  currentUser: {
    isAuth: checkToken(),
    user: checkToken() || null,
    profile: {
      image: img,
      username: 'Mutombo Jean-vincent',
    },
    notification: {
      notificationList: [],
      notificationsCount: 0,
    },
  },
  navbar: {
    isDrawerDisplay: false,
  },
};
export default initialState;
