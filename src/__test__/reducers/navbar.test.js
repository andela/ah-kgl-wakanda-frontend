import reducers from '../../reducers';
import initialState from '../../store/initialState';
import { TOGGLE_SIDE_NAV } from '../../actionTypes';
import store from '../../store';

describe('Navbar Reducer', () => {
  it('should returns the initial state when no action type is passed', () => {
    const reducer = reducers(initialState, {});
    expect(reducer).toEqual(store.getState());
  });

  it('TOGGLE_SIDE_NAV', () => {
    const action = {
      type: TOGGLE_SIDE_NAV,
      payload: false,
    };
    const reducer = reducers(initialState, action);
    expect(reducer).toBeDefined();
  });
});
