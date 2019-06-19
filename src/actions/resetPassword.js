import axios from 'axios';
import { RESET_PASSWORD, RESET_PASSWORD_SEND, RESET_PASSWORD_ERROR } from '../actionTypes/index';

/**
 * @returns {*} dispatch
 * @param {string} email
 */
const resetPassword = email => async dispatch => {
  dispatch({
    type: RESET_PASSWORD_SEND,
    payload: email,
  });

  try {
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/reset_password`, { email });
    dispatch({
      type: RESET_PASSWORD,
      payload: email,
    });
  } catch ({ response }) {
    const payload = response
      ? response.data
      : {
          message: 'No internet access',
        };
    dispatch({
      type: RESET_PASSWORD_ERROR,
      payload,
    });
  }
};

export default resetPassword;
