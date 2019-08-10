import path from 'path';
import { readFileSync } from 'fs';
import jwt from 'jsonwebtoken';

const publicKey = readFileSync(path.resolve(__dirname, '..', 'public/keys/public.key'), 'utf8');

const privateKey = readFileSync(path.resolve(__dirname, '..', 'public/keys/private.key'), 'utf8');

const options = {
  algorithm: 'RS256',
  expiresIn: '24h'
};

export const sign = (payload) => {
  return jwt.sign(payload, privateKey, options);
}

export const verify = (token) => {
  return jwt.verify(token, publicKey, options);
}