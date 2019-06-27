import * as types from '../actionTypes/profileActionTypes';
import wakanda from '../api/wakanda';
/**
 * @returns {*} object
 * @param {string} payload
 */
export const viewProfile = payload => dispatch => {
  return wakanda
    .get(`api/users/${payload}`)
    .then(res => {
      const { profile } = res.data;
      dispatch({
        type: types.SET_PROFILE,
        payload: profile,
      });
    })
    .catch(err => {
      err.message = 'Please check your internet and reload';
      document.getElementById('message').innerHTML = err.message;
    });
};

/**
 * @returns {*} object
 * @param {string} payload
 * @param {string} username
 */
export const editProfile = (payload, username) => dispatch => {
  wakanda.put(`api/user/${username}`, { ...payload }).then(res => {
    const { profile } = res.data;
    viewProfile();
    dispatch({
      type: types.EDIT_PROFILE,
      payload: profile,
    });
  });
};
