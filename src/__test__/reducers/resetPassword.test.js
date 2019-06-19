import resetPassword from '../../reducers/resetPassword';

describe('Reducer resetPassword', () => {
  it('return ', async () => {
    const res = resetPassword({}, { type: 'RESET_PASSWORD', payload: {} });
    expect(res.emailSent).toBeTruthy();
    expect(res.error).toBeFalsy();
  });

  it('return loading true', async () => {
    const res = resetPassword({}, { type: 'RESET_PASSWORD_SEND', payload: {} });
    expect(res.loading).toBeTruthy();
  });

  it('return emailSent with true value ', async () => {
    const res = resetPassword(
      {},
      { type: 'RESET_PASSWORD_ERROR', payload: { message: 'message with error' } },
    );
    expect(res.error).toBeTruthy();
    expect(res.message).toBe('message with error');
  });

  it('return an empty object ', async () => {
    const res = resetPassword(
      {},
      { type: 'RESET_PASSWORD_ERROR_UNKWOWN', payload: { message: 'message with error' } },
    );
    expect(res).toEqual(expect.any(Object));
  });
});
