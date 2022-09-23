const jwt = require('jsonwebtoken');
const fs = require('fs');

require('dotenv').config();

const jwtConfig = { expiresIn: '60m', algorithm: 'HS256' };

const secret = fs.readFileSync('jwt.evaluation.key').toString().trim();

const generateToken = (payload) => jwt.sign(payload, secret, jwtConfig);

const verifyToken = (token) => jwt.verify(token, secret);


module.exports = {
  generateToken,
  verifyToken,
}