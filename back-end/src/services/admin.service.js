const crypto = require('crypto');
const Model = require('../database/models');

const AdminService = {
  createUser: async (body) => {
    const { name, email, password, role } = body;
    const nameExists = await Model.users.findOne({ where: { name }, raw: true });
    const emailExists = await Model.users.findOne({ where: { email }, raw: true });

    if (nameExists || emailExists) return null;
    // // https://gist.github.com/kitek/1579117
    const hashedPass = crypto.createHash('md5').update(password).digest('hex');
    const newUser = await Model.users.create({ name, email, password: hashedPass, role });

    return newUser;
  },
};

module.exports = AdminService;