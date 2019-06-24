import searchFilter from '../../reducers/search';
import { SEARCH_STARTED, SEARCH_SUCCESS, SEARCH_ERROR } from '../../actionTypes/search';

describe('Search Reducer', () => {
  it('SEARCH_STARTED', () => {
    const action = {
      type: SEARCH_STARTED,
      payload: {},
    };
    const res = searchFilter({}, action);
    expect(res.loading).toBeTruthy();
  });

  it('SEARCH_SUCCESS', () => {
    const action = {
      type: SEARCH_SUCCESS,
      payload: {
        data: {},
      },
    };
    const res = searchFilter({}, action);
    expect(res).toBeDefined();
    expect(res.loading).toBeFalsy();
    expect(res.articles).toEqual(action.payload);
    expect(res.error).toBeFalsy();
  });

  it('SEARCH_ERROR', () => {
    const action = {
      type: SEARCH_ERROR,
      payload: {
        error: {},
      },
    };
    const res = searchFilter({}, action);
    expect(res).toBeDefined();
    expect(res.loading).toBeFalsy();
    expect(res.error).toEqual(action.payload);
  });
});
