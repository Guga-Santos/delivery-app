const Model = require('../database/models');

const SellerService = {
  getSaleBySellerId: async (id) => {
    const seller = await Model.sales.findAll({ 
      where: { sellerId: id } });

    if (!seller) return null;

    return seller;
  },
};

module.exports = SellerService;
