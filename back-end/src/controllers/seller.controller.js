const SellerService = require('../services/seller.service');

const SalesController = {
  getSaleBySellerId: async (req, res) => {
    const { id } = req.params;

    const seller = await SellerService.getSaleBySellerId(id);
    if (!seller) {
      return res.status(404).json({ message: 'Sales not found!' });
    }
    res.status(200).json(seller);
  },
};

module.exports = SalesController;
