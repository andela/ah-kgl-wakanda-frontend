import checkToken from '../helpers/checkToken';

const initialState = {
  currentUser: {
    isAuth: !!checkToken(),
    user: checkToken() || null,
  },
};
export default initialState;
