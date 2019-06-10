import axios from 'axios';
import { UPDATE_PASSWORD, UPDATE_PASSWORD_SEND, UPDATE_PASSWORD_ERROR } from '../actionTypes/index';

/**
 * @returns {*} dispatch
 * @param {string} password
 * @param {string} token
 */
const updatePassword = (password, token) => async dispatch => {
  dispatch({
    type: UPDATE_PASSWORD_SEND,
  });

  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/password`,
      { password },
      { headers },
    );
    dispatch({
      type: UPDATE_PASSWORD,
    });
  } catch ({ response }) {
    const payload = response
      ? response.data
      : {
          message: 'No internet access',
        };
    dispatch({
      type: UPDATE_PASSWORD_ERROR,
      payload,
    });
  }
};

export default updatePassword;
