import { UPDATE_ISAUTH } from '../actionTypes/system';
import checkToken from '../helpers/checkToken';

/**
 * @returns {*} dispatch
 * @param {string} username
 */
export default () => dispatch => {
  // Do some actions
  const tokenInfo = checkToken();
  if (tokenInfo) {
    dispatch({
      type: UPDATE_ISAUTH,
      payload: tokenInfo,
    });
  }
};
