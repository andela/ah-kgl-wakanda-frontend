import { toast } from 'react-toastify';
import { SUBMIT_RATING, RATING_ERROR, GET_RATINGS } from '../actionTypes/rating';
import wakanda from '../api/wakanda';
import { getArticle } from './article';

/**
 * @returns {*} dispatch
 * @param {string} slug
 */
export const getRatings = slug => dispatch => {
  wakanda.get(`/api/articles/${slug}/ratings`).then(response => {
    dispatch({
      type: GET_RATINGS,
      payload: response.data,
    });
  });
};

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
      dispatch(getArticle(slug));
    })
    .catch(error => {
      let message = 'You must be logged in';
      if (error.response) message = 'No internet access';
      dispatch({
        type: RATING_ERROR,
        payload: message,
      });
      toast.error(message);
    });
};
