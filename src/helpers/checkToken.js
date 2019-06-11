import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * checkToken
 * @param {object} props
 * @returns {void}
 */
const checkToken = () => {
  const auth = localStorage.getItem('token_ah_wakanda');
  if (!auth) return false;
  const [, token] = auth.split(' ');
  try {
    const jwtPayload = jwt.verify(token, process.env.REACT_APP_JWT_SECRET_KEY);
    return jwtPayload;
  } catch (err) {
    return false;
  }
};

export default checkToken;
