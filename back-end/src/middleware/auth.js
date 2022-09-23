const jwt = require('jsonwebtoken');

const secret = 'secret_key';

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