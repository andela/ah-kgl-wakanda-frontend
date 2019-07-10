import rating from '../../reducers/rating';

describe('Reducer rating', () => {
  it('return ', async () => {
    const res = rating({}, { type: 'SUBMIT_RATING', payload: {} });
    expect(res.loading).toBeFalsy();
    expect(res.errorMessage).toBe(null);
  });

  it('return ', async () => {
    const res = rating({}, { type: 'GET_RATINGS', payload: { ratings: [{ id: 1, rate: 3 }] } });
    expect(res.ratings[0].id).toBe(1);
    expect(res.loading).toBeFalsy();
    expect(res.errorMessage).toBe(null);
  });

  it('return loading true', async () => {
    const res = rating({}, { type: 'RATING_ERROR', payload: 'rating error' });
    expect(res.errorMessage).toBe('rating error');
  });
});
