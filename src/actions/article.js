import { toast } from 'react-toastify';
import { PUBLISH_ARTICLE, GET_SINGLE_ARTICLE, DELETE_SINGLE_ARTICLE } from '../actionTypes/article';
import { NOT_FOUND, SUCCESS_MESSAGE } from '../actionTypes/system';
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
 * @param {string} article
 */
export const updateArticle = (slug, article) => dispatch => {
  wakanda
    .put(`/api/articles/${slug}`, {
      article,
    })
    .then(response => {
      const updatedArticle = response.data.data;
      dispatch({
        type: PUBLISH_ARTICLE,
        payload: updatedArticle.article,
      });
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

/**
 * @returns {*} dispatch
 * @param {string} slug
 */
export const deleteArticle = slug => dispatch => {
  wakanda
    .delete(`/api/articles/${slug}`)
    .then(response => {
      const { message } = response.data;
      const successNotification = {
        successMessage: {
          status: true,
          message,
        },
      };
      dispatch({
        type: DELETE_SINGLE_ARTICLE,
      });
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: successNotification,
      });
    })
    .catch(error => {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Internet Lost');
      }
    });
};
