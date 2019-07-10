import initialState from '../store/initialState';

import * as types from '../actionTypes/profileActionTypes';
import { UPDATE_USER } from '../actionTypes';

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
        loading: false,
      };
    case types.EDIT_PROFILE:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case 'PROFILE_LOADING':
      return {
        ...state,
        loading: true,
      };
    case types.EMAIL_NOTIFICATION:
      return {
        ...state,
        user: { ...state.user, ...payload },
        loading: false,
      };
    default:
      return state;
  }
};

export default profile;
