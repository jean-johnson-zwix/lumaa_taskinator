import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';


const SECRET = process.env.JWT_SECRET;
export function signToken(user) {
  return jwt.sign(user, SECRET, { expiresIn: '1h' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}