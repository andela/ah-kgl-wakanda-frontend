import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { SocialLogin } from '../../Components/SocialLogin';

const props = {
  onSocialLogin: jest.fn(),
};

sinon.stub(window.location, 'replace');

describe('Render SocialLogin component', () => {
  it('to have wrapper class', async () => {
    const wrapper = shallow(<SocialLogin {...props} />);
    const btn = wrapper.find('Button[social="twitter"]');
    btn.simulate('click');
    expect(btn.length).toBe(1);
  });

  it('to have wrapper class', async () => {
    const wrapper = mount(<SocialLogin {...props} />);
    const btn = wrapper.find('Button[social="google"]');
    btn.simulate('click');
    wrapper
      .instance()
      .responseSocialLogin({ response: { accessToken: 'acessToken' }, provider: 'google' });

    expect(btn.length).toBe(1);
  });
});
