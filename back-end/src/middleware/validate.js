const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });

const Auth = {
  validateAdmin: async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Unauthorized Access' });
    }
    const { role } = jwt.verify(authorization, secret);
    if (!role || role !== 'administrator') {
      return res.status(401).json({ message: 'Unauthorized Access' });
    }
    next();
  },
};

module.exports = Auth;