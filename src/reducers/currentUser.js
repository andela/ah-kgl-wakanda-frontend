import initialState from '../store/initialState';
import { CHANGE_NAME, UPDATE_USER } from '../actionTypes';

/**
 *
 * @param {object} state
 * @param {object} action
 * @returns {object} new state
 */
const currentUser = (state = initialState.profile, { type, payload }) => {
  switch (type) {
    case CHANGE_NAME:
      return {
        ...state,
        team: payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};

export default currentUser;
