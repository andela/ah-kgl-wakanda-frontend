import updatePassword from '../../reducers/updatePassword';

describe('Reducer updatePassword', () => {
  it('return ', async () => {
    const res = updatePassword({}, { type: 'UPDATE_PASSWORD', payload: {} });
    expect(res.updated).toBeTruthy();
    expect(res.error).toBeFalsy();
  });

  it('return loading true', async () => {
    const res = updatePassword({}, { type: 'UPDATE_PASSWORD_SEND', payload: {} });
    expect(res.loading).toBeTruthy();
  });

  it('return emailSent with true value ', async () => {
    const res = updatePassword(
      {},
      { type: 'UPDATE_PASSWORD_ERROR', payload: { message: 'message with error' } },
    );
    expect(res.error).toBeTruthy();
    expect(res.message).toBe('message with error');
  });

  it('return an empty object ', async () => {
    const res = updatePassword(
      {},
      { type: 'UPDATE_PASSWORD_ERROR_UNKWOWN', payload: { message: 'message with error' } },
    );
    expect(res).toEqual(expect.any(Object));
  });
});
