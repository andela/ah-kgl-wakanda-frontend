import { TOGGLE_SIDE_NAV } from '../actionTypes';
import initialState from '../store/initialState';

/**
 * @param {object} state
 * @param {object} action
 * @returns {object} new state
 */
const navbar = (state = initialState.navbar, { type, payload }) => {
  switch (type) {
    case TOGGLE_SIDE_NAV:
      return {
        ...state,
        isDrawerDisplay: payload,
      };
    default:
      return state;
  }
};

export default navbar;
