const jwt = require('jsonwebtoken');
const fs = require('fs');
const Model = require('../database/models');

const secret = fs.readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });

const generateToken = (payload) => jwt.sign(payload, secret);

const verifyToken = (token) => jwt.verify(token, secret);

const validateUser = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const data = jwt.verify(token, secret);
    const user = await Model.users.findOne({
      where: { email: data.email },
    });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token!' });
  }
};

module.exports = {
  generateToken,
  verifyToken,
  validateUser,
};