import profile from '../../reducers/profileReducers';

describe('Profile Reducer', () => {
  it('Fetch Profile', async () => {
    const res = profile({}, { type: 'SET_PROFILE', payload: {} });
    expect(res.user).toBeTruthy();
  });
  it('Update user after editing', async () => {
    const req = profile({}, { type: 'UPDATE_USER', payload: {} });
    expect(req.user).toBeTruthy();
  });
});
