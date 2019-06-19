import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { toggleSideNav } from '../../actions/toggleSideNav';
import { TOGGLE_SIDE_NAV } from '../../actionTypes';
import initialState from '../../store/initialState';

const mockStore = configureMockStore([thunk]);
applyMiddleware(promiseMiddleware);

describe('Actions', () => {
  let store;
  const isDrawerDisplay = false;

  beforeEach(() => {
    store = mockStore(initialState);
  });
  it('dispatches TOGGLE_SIDE_NAV action', async () => {
    await store.dispatch(toggleSideNav(isDrawerDisplay));
    const actions = store.getActions();

    expect(actions[0].type).toEqual(TOGGLE_SIDE_NAV);
    expect(actions[0].payload).toBeFalsy();
  });
});
