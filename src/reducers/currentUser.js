import initialState from '../store/initialState';

/**
 *
 * @param {object} state
 * @param {object} action
 * @returns {object} new state
 */
const currentUser = (state = initialState.currentUser) => state;

export default currentUser;
