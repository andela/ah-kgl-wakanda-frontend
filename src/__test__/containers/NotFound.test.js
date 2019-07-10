import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import NotFound from '../../Containers/NotFound/NotFound';

const mockStore = configureMockStore([thunk]);

const props = {
  system: { notFound: { attribute: '' } },
};

let store;
beforeEach(() => {
  store = mockStore({ system: { notFound: { attribute: '' } } });
});
it('to have wrapper class', async () => {
  const wrapper = mount(
    <Provider store={store}>
      <NotFound store={store} {...props} />
    </Provider>,
  );

  expect(wrapper.find('.error-pg').length).toBe(1);
});
