import { toast } from 'react-toastify';
import axios from 'axios';
import { UPDATE_USER } from '../actionTypes';

/**
 * @returns {*} dispatch
 * @param {string} username
 */
export default username => dispatch => {
  const token = localStorage.getItem('token_ah_wakanda') || null;
  // Do some actions
  dispatch({
    type: 'LOADING_LOGIN',
  });
  axios
    .get(`/api/users/${username}`, {
      baseURL: process.env.REACT_APP_BACKEND_URL,
      headers: {
        Authorization: token,
      },
    })
    .then(response => {
      const { profile } = response.data;
      localStorage.setItem('profile', JSON.stringify(profile));
      dispatch({
        type: UPDATE_USER,
        payload: profile,
      });
    })
    .catch(error => {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Internet Lost');
      }
    });
};
