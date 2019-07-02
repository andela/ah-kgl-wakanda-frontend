/* eslint no-use-before-define: 0 */
import { toast } from 'react-toastify';
import {
  PUBLISH_ARTICLE,
  GET_SINGLE_ARTICLE,
  DELETE_SINGLE_ARTICLE,
  LOAD,
  STOP_LOADING,
  DISPLAY_COMMENTS,
} from '../actionTypes/article';
import { NOT_FOUND, SUCCESS_MESSAGE } from '../actionTypes/system';
import wakanda from '../api/wakanda';

/**
 *Update comment
 *
 * @param {*} {slug}
 * @param {*} id
 * @returns {void}
 */
export const updateComment = ({ slug, id, body }) => async () => {
  try {
    await wakanda.put(`/api/articles/${slug}/comments/${id}`, {
      comment: {
        body,
      },
    });

    return true;
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error('Internet Lost');
    }

    return false;
  }
};

/**
 *Delete comment
 *
 * @param {*} {slug}
 * @param {*} id
 * @returns {void}
 */
export const deleteComment = ({ slug, id }) => async () => {
  try {
    await wakanda.delete(`/api/articles/${slug}/comments/${id}`);

    return true;
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error('Internet Lost');
    }

    return false;
  }
};

/**
 * Fetch comments
 * @return {object} response
 * @param {String} slug
 */
export const fetchComments = slug => dispatch => {
  wakanda
    .get(`/api/articles/${slug}/comments`)
    .then(response => {
      const {
        data: { data: comments },
      } = response;

      dispatch({
        type: DISPLAY_COMMENTS,
        payload: comments,
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
 *Posts a comment on an article
 *
 * @param {*} { slug, comment }
 * @returns {void}
 */
export const commentArticle = ({ slug, body }) => async dispatch => {
  dispatch({
    type: LOAD,
  });

  if (body.length === 0) {
    dispatch({
      type: STOP_LOADING,
    });
    return;
  }

  try {
    await wakanda.post(`/api/articles/${slug}/comments`, {
      comment: {
        body,
      },
    });

    toast.success('Comment posted');
    dispatch({
      type: STOP_LOADING,
    });

    return true;
  } catch (error) {
    dispatch({
      type: STOP_LOADING,
    });

    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error('Internet Lost');
    }

    return false;
  }
};

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
    .then(async response => {
      const { article } = response.data.data;

      await fetchComments(slug);

      dispatch({
        type: GET_SINGLE_ARTICLE,
        payload: article,
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

/**
 * Likes an article
 *
 * @param {*} slug
 * @returns {void}
 */
export const likeArticle = slug => async dispatch => {
  try {
    await wakanda.post(`/api/articles/${slug}/favorite`);
    toast.success('Liked');

    dispatch(getArticle(slug));

    return true;
  } catch (error) {
    if (error.response) {
      if (error.response.data.status === 409) {
        dispatch(unlikeArticle(slug));
        return;
      }
      toast.error('You must be logged in');
    } else {
      toast.error('Internet Lost');
    }
  }
};

/**
 * Unlike an article
 *
 * @param {*} slug
 * @returns {void}
 */
export const unlikeArticle = slug => async dispatch => {
  try {
    await wakanda.delete(`/api/articles/${slug}/favorite`);
    toast.success('Unliked');

    dispatch(getArticle(slug));

    return false;
  } catch (error) {
    if (error.response) {
      if (error.response.data.status === 409) {
        dispatch(likeArticle(slug));
        return;
      }
      toast.error('You must be logged in');
    } else {
      toast.error('Internet Lost');
    }
  }
};
