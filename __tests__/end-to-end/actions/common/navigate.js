const loginPage = require("../../../selectors/common/login");
const customerProductsPage = require("../../../selectors/customer/products");
const customerCheckoutPage = require("../../../selectors/customer/checkout");
const customerOrdersPage = require("../../../selectors/customer/orders");
const sellerOrdersPage = require("../../../selectors/seller/orders");

const user = require("../dataAux/user");
const { host } = require("../../../config/constants").frontEnd;

const localStorage = require("./localStorage");

const navigate = {
  login: {
    default: async (page, role) => {
      const { email, md5Translate, homePage } = user[role]();

      await expect(page).toNavigate(`${host}/login`);
      await expect(page).toCompareURL(`${host}/login`);
      await expect(page).toTypeInInput(loginPage.input.login, email);
      await expect(page).toTypeInInput(loginPage.input.password, md5Translate);

      await expect(page).toWaitReqFinished({
        trigger: () =>
          expect(page).toClickOnElement({
            selector: loginPage.button.login.notDisabled,
          }),
        method: "POST",
        status: 200,
      });

      await expect(page).toCompareURL(`${host}${homePage}`);
      return true;
    },
  },
  logout: {
    default: async (page) => {
      await expect(page).toClickOnElement({
        selector: customerProductsPage.element.navbar.links.logout,
      });
      await expect(page).toCompareURL(`${host}/login`);
      expect((await localStorage(page, "user"))).toBeUndefined();
      
      return true;
    },
  },
  register: {
    default: async (page) => {
      await expect(page).toNavigate(`${host}/login`);
      await expect(page).toCompareURL(`${host}/login`);
      await expect(page).toClickOnElement({
        selector: loginPage.button.register,
      });
      await expect(page).toCompareURL(`${host}/register`);
      return true;
    },
  },
  goto: {
    //redirect
    homepage: async (page, role) => {
      const { homePage } = user[role]();

      await expect(page).toNavigate(`${host}/login`);
      await expect(page).toCompareURL(`${host}${homePage}`);
      return true;
    },
  },
  customer: {
    products: {
      //fromNavbar
      default: async (page) => {
        await expect(page).toClickOnElement({
          selector: customerProductsPage.element.navbar.links.products,
        });
        await expect(page).toCompareURL(`${host}/customer/products`);
        return true;
      },
    },
    checkout: {
      //fromProducts
      default: async (page) => {
        await expect(page).toClickOnElement({
          selector: customerProductsPage.button.cart.notDisabled,
        });
        await expect(page).toCompareURL(`${host}/customer/checkout`);
        return true;
      },
    },
    orders: {
      //fromNavbar
      default: async (page) => {
        await expect(page).toClickOnElement({
          selector: customerProductsPage.element.navbar.links.orders,
        });
        await expect(page).toCompareURL(`${host}/customer/orders`);
        return true;
      },
    },
    orderDetails: {
      //fromOrders
      default: async (page, orderId = 1) => {
        await expect(page).toClickOnElement({
          selector:
            customerOrdersPage.element.card.deliveryStatus +
            `[data-testid$='-${orderId}']`,
        });
        await expect(page).toCompareURL(`${host}/customer/orders/${orderId}`);
        return true;
      },
      fromCheckoutPage: async (page, orderId = 1) => {
        await expect(page).toClickOnElement({
          selector: customerCheckoutPage.button.submitOrder,
        });
        await expect(page).toCompareURL(`${host}/customer/orders/${orderId}`);
        return true;
      },
    },
  },
  seller: {
    orders: {
      //fromNavbar
      default: async (page) => {
        await expect(page).toClickOnElement({
          selector: customerProductsPage.element.navbar.links.orders,
        });
        await expect(page).toCompareURL(`${host}/seller/orders`);
        return true;
      },
    },
    orderDetails: {
      //fromOrders
      default: async (page, orderId = 1) => {
        await expect(page).toClickOnElement({
          selector:
            sellerOrdersPage.element.card.deliveryStatus +
            `[data-testid$='-${orderId}']`,
        });
        await expect(page).toCompareURL(`${host}/seller/orders/${orderId}`);
        return true;
      },
    },
  },
};

module.exports = navigate;
