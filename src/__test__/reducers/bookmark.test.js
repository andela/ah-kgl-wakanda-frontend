import bookmarkArticle from '../../reducers/bookmark';
import { BOOKMARK_STARTED, BOOKMARK_SUCCESS, BOOKMARK_ERROR } from '../../actionTypes/bookmark';

describe('Bookmark Reducer', () => {
  it('BOOKMARK_STARTED', () => {
    const action = {
      type: BOOKMARK_STARTED,
      payload: {},
    };
    const res = bookmarkArticle({}, action);
    expect(res.loading).toBeTruthy();
  });

  it('BOOKMARK_SUCCESS', () => {
    const action = {
      type: BOOKMARK_SUCCESS,
      payload: {
        data: {},
      },
    };
    const res = bookmarkArticle({}, action);
    expect(res).toBeDefined();
    expect(res.loading).toBeFalsy();
    expect(res.bookmark).toEqual(action.payload);
    expect(res.error).toBeFalsy();
  });

  it('BOOKMARK_ERROR', () => {
    const action = {
      type: BOOKMARK_ERROR,
      payload: {
        error: {},
      },
    };
    const res = bookmarkArticle({}, action);
    expect(res).toBeDefined();
    expect(res.loading).toBeFalsy();
    expect(res.error).toEqual(action.payload);
  });
});
