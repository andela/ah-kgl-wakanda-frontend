import initialState from '../store/initialState';
import { CHANGE_NAME } from '../actionTypes';
import { UPDATE_ISAUTH } from '../actionTypes/system';

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
    case UPDATE_ISAUTH:
      return {
        ...state,
        isAuth: true,
        user: payload,
      };
    default:
      return state;
  }
};

export default currentUser;
