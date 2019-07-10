import unBookmarkArticle from '../../reducers/unbookmark';
import {
  UNBOOKMARK_STARTED,
  UNBOOKMARK_SUCCESS,
  UNBOOKMARK_ERROR,
} from '../../actionTypes/bookmark';

describe('UnBookmark Reducer', () => {
  it('UNBOOKMARK_STARTED', () => {
    const action = {
      type: UNBOOKMARK_STARTED,
      payload: {},
    };
    const res = unBookmarkArticle({}, action);
    expect(res.loading).toBeTruthy();
  });

  it('UNBOOKMARK_SUCCESS', () => {
    const action = {
      type: UNBOOKMARK_SUCCESS,
      payload: {
        data: {},
      },
    };
    const res = unBookmarkArticle({}, action);
    expect(res).toBeDefined();
    expect(res.loading).toBeFalsy();
    expect(res.bookmark).toEqual(action.payload);
    expect(res.error).toBeFalsy();
  });

  it('UNBOOKMARK_ERROR', () => {
    const action = {
      type: UNBOOKMARK_ERROR,
      payload: {
        error: {},
      },
    };
    const res = unBookmarkArticle({}, action);
    expect(res).toBeDefined();
    expect(res.loading).toBeFalsy();
    expect(res.error).toEqual(action.payload);
  });
});
