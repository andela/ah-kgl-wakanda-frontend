import { CHANGE_NAME } from '../actionTypes';

/**
 * @returns {*} dispatch
 * @param {string} name
 */
export const changeName = name => dispatch => {
  // Do some actions
  dispatch({
    type: CHANGE_NAME,
    payload: name,
  });
};
