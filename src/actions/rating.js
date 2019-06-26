import { toast } from 'react-toastify';
import { SUBMIT_RATING, RATING_ERROR } from '../actionTypes/rating';
import wakanda from '../api/wakanda';

/**
 * @returns {*} dispatch
 * @param {string} rate
 * @param {string} slug
 */
export default (rate, slug) => dispatch => {
  wakanda
    .post(`/api/articles/rate/${slug}`, {
      rate,
    })
    .then(response => {
      dispatch({
        type: SUBMIT_RATING,
        payload: response.data,
      });
      toast.success(response.data.message);
    })
    .catch(error => {
      let message = '';
      message = error.response ? error.response.data.message : 'No internet access';
      if (error.response.status === 400) message = 'You need to first sign in';
      dispatch({
        type: RATING_ERROR,
        payload: message,
      });
      toast.error(message);
    });
};
