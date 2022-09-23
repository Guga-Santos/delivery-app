const RegisterService = require('../services/register.service');

const RegisterController = {
  create: async (req, res) => {
    const newCustomer = await RegisterService.create(req.body);

    if (!newCustomer) return res.status(409).json({ message: 'Customer already exist' });

    res.status(201).json({ message: 'created' });
  },
};

module.exports = RegisterController;
