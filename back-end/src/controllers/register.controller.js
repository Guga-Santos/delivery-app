const RegisterService = require('../services/register.service');

const RegisterController = {
  create: async (req, res) => {
    const code = await RegisterService.create(req.body);

    if (!code) return res.status(500).json({ message: 'Internal error!' });

    res.status(code).end();
  },
};

module.exports = RegisterController;
