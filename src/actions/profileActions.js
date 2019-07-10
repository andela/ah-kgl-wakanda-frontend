import { toast } from 'react-toastify';
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
    .catch(error => {
      toast.error('You need connectivity');
      throw error;
    });
};

/**
 * @returns {*} object
 * @param {string} payload
 * @param {string} username
 */
export const editProfile = (payload, username) => dispatch => {
  dispatch({
    type: 'PROFILE_LOADING',
  });
  wakanda.put(`api/user/${username}`, { ...payload }).then(res => {
    const { profile } = res.data;
    toast.success('Your profile was edited');
    viewProfile();
    dispatch({
      type: types.EDIT_PROFILE,
      payload: profile,
    });
  });
};

/**
 * @returns {*} object
 * @param {string} username
 */
export const emailNotificationSubscription = () => dispatch => {
  wakanda.put(`api/notifications/subscribe`).then(res => {
    const { allowEmailNotification } = res.data.user;
    toast.success('Notification Option Well Edited');
    viewProfile();
    dispatch({
      type: types.EMAIL_NOTIFICATION,
      payload: { allowEmailNotification },
    });
  });
};
