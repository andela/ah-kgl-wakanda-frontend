import initialState from '../store/initialState';

import * as types from '../actionTypes/profileActionTypes';

/**
 *
 * @param {object} state
 * @param {object} action
 * @returns {object} new state
 */
const profile = (state = initialState.profile.user, { type, payload }) => {
  switch (type) {
    case types.SET_PROFILE:
      return {
        ...state,
        user: payload,
      };
    case types.EDIT_PROFILE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default profile;
