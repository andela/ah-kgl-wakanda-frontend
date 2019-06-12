import axios from 'axios';
import { SIGNUP_ERROR, SIGNUP_SUCCESS, SIGNUP_STARTED } from '../actionTypes/signupTypes';

export /**
 * Triggers an action
 * when the sign up process starts
 * @return {object} action
 */
const signupStarted = () => ({
  type: SIGNUP_STARTED,
});

export /**
 * Triggers an action
 * when the sign up process succeed
 * @param {object} user
 * @return {object} action
 */
const signupSuccess = user => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});

export /**
 * Triggers an action
 * when the sign up process fails
 * @param {object} error
 * @return {object} action
 */ const signupError = error => ({
  type: SIGNUP_ERROR,
  payload: error,
});

export /**
 * Register the user
 * @param {*} { username, email, password }
 * @return {object} response
 */
const signup = ({ username, email, password }) => async dispatch => {
  dispatch(signupStarted());

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`,
      {
        username,
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const { user } = res.data;

    // Save the user with the authorization token
    localStorage.setItem('token_ah_wakanda', `Bearer ${user.token}`);
    localStorage.setItem('user_ah_wakanda', JSON.stringify(user));

    dispatch(signupSuccess(user));
    return res;
  } catch (e) {
    if (e.response) {
      dispatch(signupError(e.response.data.message));
      return e.response;
    }
    dispatch(signupError('Please check your internet connection'));
    return e;
  }
};
