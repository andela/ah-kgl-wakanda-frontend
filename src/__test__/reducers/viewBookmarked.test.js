import viewBookmarkArticles from '../../reducers/viewBookmarked';
import {
  VIEW_BOOKMARKED_STARTED,
  VIEW_BOOKMARKED_SUCCESS,
  VIEW_BOOKMARKED_ERROR,
} from '../../actionTypes/viewBookmarked';

describe('UnBookmark Reducer', () => {
  it('VIEW_BOOKMARKED_STARTED', () => {
    const action = {
      type: VIEW_BOOKMARKED_STARTED,
      payload: {},
    };
    const res = viewBookmarkArticles({}, action);
    expect(res.loading).toBeTruthy();
  });

  it('VIEW_BOOKMARKED_SUCCESS', () => {
    const action = {
      type: VIEW_BOOKMARKED_SUCCESS,
      payload: {
        data: {},
      },
    };
    const res = viewBookmarkArticles({}, action);
    expect(res).toBeDefined();
    expect(res.loading).toBeFalsy();
    expect(res.bookmarkArticles).toEqual(action.payload);
    expect(res.error).toBeFalsy();
  });

  it('VIEW_BOOKMARKED_ERROR', () => {
    const action = {
      type: VIEW_BOOKMARKED_ERROR,
      payload: {
        error: {},
      },
    };
    const res = viewBookmarkArticles({}, action);
    expect(res).toBeDefined();
    expect(res.loading).toBeFalsy();
    expect(res.error).toEqual(action.payload);
  });
});
