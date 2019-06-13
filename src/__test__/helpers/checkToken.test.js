import jwt from 'jsonwebtoken';
import checkToken from '../../helpers/checkToken';
import initialState from '../../store/initialState';

const token = jwt.sign(
  { id: 2, username: 'username', email: 'username@user.name' },
  process.env.REACT_APP_JWT_SECRET_KEY,
  {
    expiresIn: '3d',
  },
);

describe('Test checkToken', () => {
  it('should call getItem', () => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem');
    Object.getPrototypeOf(window.localStorage).getItem = jest.fn(() => null);
    checkToken();
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('should call getItem with a wrong token', () => {
    jest.spyOn(window.localStorage, 'getItem');
    window.localStorage.getItem = jest.fn(() => 'token token');
    checkToken();
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('should call getItem with a good token', () => {
    jest.spyOn(window.localStorage, 'getItem');
    window.localStorage.getItem = jest.fn(() => `Bearer ${token}`);
    checkToken();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
});

describe('Test the initial state', () => {
  it('should get the initial state', () => {
    jest.spyOn(window.localStorage, 'getItem');
    window.localStorage.getItem = jest.fn(() => `Bearer ${token}`);
    const { isAuth } = initialState.currentUser;
    expect(isAuth).toBeFalsy();
  });
});
