import { TOGGLE_SIDE_NAV } from '../actionTypes';
import initialState from '../store/initialState';

/**
 * @param {object} state
 * @param {object} action
 * @returns {object} new state
 */
const navbar = (state = initialState.navbar, { type }) => {
  switch (type) {
    case TOGGLE_SIDE_NAV:
      return {
        ...state,
        isDrawerDisplay: !state.isDrawerDisplay,
      };
    default:
      return state;
  }
};

/**
 * @param {object} state
 * @param {object} action
 * @returns {object} new state
 */
export const profile = (state = initialState.profile) => state;

export default navbar;
