import initialState from '../store/initialState';
import { CHANGE_NAME } from '../actionTypes';

/**
 *
 * @param {object} state
 * @param {object} action
 * @returns {object} new state
 */
const currentUser = (state = initialState.currentUser, { type, payload }) => {
  switch (type) {
    case CHANGE_NAME:
      return {
        ...state,
        team: payload,
      };
    default:
      return state;
  }
};

export default currentUser;
