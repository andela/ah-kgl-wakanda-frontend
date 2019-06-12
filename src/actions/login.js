import { SUBMIT_LOGIN, ERROR_LOGIN } from '../actionTypes/login';
import wakanda from '../api/wakanda';

/**
 * @returns {*} dispatch
 * @param {string} name
 */
export default ({ email, password }) => dispatch => {
  // Do some actions
  wakanda
    .post('/auth/login', {
      email,
      password,
    })
    .then(response => {
      const { user } = response.data;
      dispatch({
        type: SUBMIT_LOGIN,
        payload: user,
      });
    })
    .catch(error => {
      const { message } = error.response.data;
      dispatch({
        type: ERROR_LOGIN,
        payload: message,
      });
    });
};
