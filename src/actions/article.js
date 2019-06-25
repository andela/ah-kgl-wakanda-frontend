import { toast } from 'react-toastify';
import { PUBLISH_ARTICLE, GET_SINGLE_ARTICLE } from '../actionTypes/article';
import { NOT_FOUND } from '../actionTypes/system';
import wakanda from '../api/wakanda';

/**
 * @returns {*} dispatch
 * @param {string} article
 */
export default article => dispatch => {
  wakanda
    .post('/api/articles', {
      article,
    })
    .then(response => {
      const newArticle = response.data.data;
      dispatch({
        type: PUBLISH_ARTICLE,
        payload: newArticle.article,
      });
      toast.success('Article successfully created');
    })
    .catch(error => {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Internet Lost');
      }
    });
};

/**
 * @returns {*} dispatch
 * @param {string} slug
 */
export const getArticle = slug => dispatch => {
  wakanda
    .get(`/api/articles/${slug}`)
    .then(response => {
      const newArticle = response.data.data;
      dispatch({
        type: GET_SINGLE_ARTICLE,
        payload: newArticle.article,
      });
    })
    .catch(error => {
      if (error.response && error.response.status === 404) {
        const payload = {
          notFound: {
            status: true,
            attribute: 'Article',
          },
        };
        dispatch({
          type: NOT_FOUND,
          payload,
        });
      }
    });
};
