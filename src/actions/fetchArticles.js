import axios from 'axios';
import {
  FETCH_ARTICLES_STARTED,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
  FETCH_USER_ARTICLES,
  NEW_FEED,
  NEW_USER_ARTICLES,
} from '../actionTypes/fetchArticles';
import wakanda from '../api/wakanda';

/**
 * Triggers an action
 * when the fetching process starts
 * @return {object} action
 */
export const fetchStart = () => ({
  type: FETCH_ARTICLES_STARTED,
});

/**
 * Triggers an action
 * when the fetching process succeeds
 * @param {object} articles
 * @return {object} action
 */
export const fetchSuccess = articles => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: articles,
});

/**
 * Triggers an action
 * when the fetching process succeeds
 * @param {object} articles
 * @return {object} action
 */
export const fetchNewFeedSuccess = articles => ({
  type: NEW_FEED,
  payload: articles,
});

/**
 * Triggers an action
 * when the fetching process succeeds
 * @param {object} articles
 * @return {object} action
 */
export const fetchUserArticlesSuccess = articles => ({
  type: FETCH_USER_ARTICLES,
  payload: articles,
});

/**
 * Triggers an action
 * when the fetching process succeeds
 * @param {object} articles
 * @return {object} action
 */
export const fetchNewUserArticlesSuccess = articles => ({
  type: NEW_USER_ARTICLES,
  payload: articles,
});

/**
 * Triggers an action
 * when the fetching process fails
 * @param {object} error
 * @return {object} action
 */
export const fetchError = error => ({
  type: FETCH_ARTICLES_ERROR,
  payload: error,
});

/**
 * Fetch comments
 * @return {object} response
 * @param {String} slug
 */
export const fetchComments = async slug => {
  const res = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/api/articles/${slug}/comments`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const {
    data: {
      data: { commentsCount },
    },
  } = res;

  return commentsCount;
};

/**
 * Gets user articles
 * @param {string} username
 * @returns {void}
 */
export const fetchUserArticles = username => async dispatch => {
  dispatch(fetchStart());

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/articles/${username}/private?limit=10`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const {
      data: {
        data: { articles },
      },
    } = res;

    if (articles.length === 0) {
      dispatch(fetchUserArticlesSuccess(articles));
      return;
    }

    // Map articles with comments
    await articles.forEach(async (element, index) => {
      const count = await fetchComments(element.slug);
      articles[index].commentsCount = count;
      if (index === articles.length - 1) dispatch(fetchUserArticlesSuccess(articles));
    });
  } catch (e) {
    if (e.response) {
      dispatch(fetchError(e.response.data.message));
    }
    dispatch(fetchError('Please check your internet connection'));
  }
};
/**
 * Gets user articles
 * @param {string} username
 * @param {string} offset
 * @param {string} limit
 * @returns {void}
 */
export const fetchNewUserArticles = (username, offset, limit) => async dispatch => {
  dispatch(fetchStart());

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/articles/${username}/private?offset=${offset}&limit=${limit}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const {
      data: {
        data: { articles },
      },
    } = res;

    if (articles.length === 0) dispatch(fetchNewUserArticlesSuccess(articles));

    // Map articles with comments
    await articles.forEach(async (element, index) => {
      const count = await fetchComments(element.slug);
      articles[index].commentsCount = count;
      if (index === articles.length - 1) dispatch(fetchNewUserArticlesSuccess(articles));
    });
  } catch (e) {
    if (e.response) {
      dispatch(fetchError(e.response.data.message));
    }
    dispatch(fetchError('Please check your internet connection'));
  }
};

/**
 * Fetch articles
 * @return {object} response
 */
export const fetchArticles = () => async dispatch => {
  dispatch(fetchStart());

  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/articles?limit=10`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const {
      data: { articles },
    } = res.data;

    // Map articles with comments
    await articles.forEach(async (element, index) => {
      const count = await fetchComments(element.slug);
      articles[index].commentsCount = count;
      if (index === articles.length - 1) dispatch(fetchSuccess(articles));
    });
  } catch (e) {
    if (e.response) {
      dispatch(fetchError(e.response.data.message));
    }
    dispatch(fetchError('Please check your internet connection'));
  }
};

/**
 * @returns {*} dispatch
 * @param {number} offset
 * @param {number} limit
 */
export const fetchNewFeed = (offset, limit) => dispatch => {
  dispatch(fetchStart());
  wakanda
    .get(`/api/articles?offset=${offset}&limit=${limit}`)
    .then(async response => {
      const { articles } = response.data.data;

      if (articles.length === 0) dispatch(fetchNewFeedSuccess(articles));
      // Map articles with comments
      await articles.forEach(async (element, index) => {
        const count = await fetchComments(element.slug);
        articles[index].commentsCount = count;
        if (index === articles.length - 1) dispatch(fetchNewFeedSuccess(articles));
      });
    })
    .catch(e => {
      if (e.response) {
        dispatch(fetchError(e.response.data.message));
      }
      dispatch(fetchError('Please check your internet connection'));
    });
};
