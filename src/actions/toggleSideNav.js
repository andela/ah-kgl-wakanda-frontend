import { TOGGLE_SIDE_NAV } from '../actionTypes';

/**
 * action to toggle the sideNav
 * @returns {object} action
 * @param {boolean} payload
 */
export const toggleSideNav = payload => ({
  type: TOGGLE_SIDE_NAV,
  payload,
});
