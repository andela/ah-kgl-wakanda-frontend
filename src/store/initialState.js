import checkToken from '../helpers/checkToken';

const initialState = {
  name: { team: 'Wakanda' },
  title: 'Hello world',
  currentUser: {
    isAuth: checkToken(),
    user: checkToken() || null,
  },
};
export default initialState;
