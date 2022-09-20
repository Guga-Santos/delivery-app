const { state01, test01 } = require("../../../entities/users");

const getUserStateById = (id) => state01.find((el) => el.id === id);
const getUserTestById = (id) => test01.find((el) => el.id === id);

module.exports = {
  customer: () => ({
    ...getUserStateById(3),
    md5Translate: getUserTestById(3).password,
    homePage: "/customer/products",
  }),
  seller: () => ({
    ...getUserStateById(2),
    md5Translate: getUserTestById(2).password,
    homePage: "/seller/orders",
  }),
  administrator: () => ({
    ...getUserStateById(1),
    md5Translate: getUserTestById(1).password,
    homePage: "/admin/manage",
  }),
};
