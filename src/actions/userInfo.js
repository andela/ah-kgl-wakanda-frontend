import { toast } from 'react-toastify';
import { UPDATE_USER } from '../actionTypes';
import wakanda from '../api/wakanda';

/**
 * @returns {*} dispatch
 * @param {string} username
 */
export default username => dispatch => {
  // Do some actions
  dispatch({
    type: 'LOADING_LOGIN',
  });
  wakanda
    .get(`/api/users/${username}`)
    .then(response => {
      const { profile } = response.data;
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
