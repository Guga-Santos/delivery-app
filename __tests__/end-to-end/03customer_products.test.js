const axios = require("axios");
const jwt = require("jsonwebtoken");

const requirement = global.__REQUIREMENTS__;
const action = require("./actions");
const user = require("./actions/dataAux/user");

const customerProductsPage = require("../selectors/customer/products");
const products = require("../entities/products");
const localStorage = require("./actions/common/localStorage");
const { showCurrentCart } = require("./actions/customer");

const { host } = require("../config/constants").frontEnd;

const jwtKey = require("fs")
  .readFileSync("./back-end/jwt.evaluation.key", { encoding: "utf-8" });

let database;
beforeEach(async () => {
  database = global.__DATABASE__;
  expect(
    await action.common.navigate.login.default(page, "customer")
  ).toBeTruthy();

  await expect(database).toReturnDataWith({
    query: products.query,
    types: products.types,
    compare: products.state01,
  });
});

describe(requirement(11), () => {
  test("O avaliador testará a existência dos data-testids referentes ao navbar", async () => {
    await expect(page).toFindElement(
      customerProductsPage.element.navbar.links.products
    );
    await expect(page).toFindElement(
      customerProductsPage.element.navbar.links.orders
    );
    await expect(page).toFindElement(
      customerProductsPage.element.navbar.userFullName
    );
    await expect(page).toFindElement(
      customerProductsPage.element.navbar.links.logout
    );
  });
});

describe(requirement(12), () => {
  const cardIds = products.state01.map((el) => el.id);

  test("O avaliador testará os data-testids referentes aos card de cada produto",
    async () => {
      for(const id of cardIds){
        await expect(page).toFindElement(
          customerProductsPage.element.card.title + `[data-testid$='-${id}']`
        );
        await expect(page).toFindElement(
          customerProductsPage.element.card.price + `[data-testid$='-${id}']`
        );
        await expect(page).toFindElement(
          customerProductsPage.img.card.bgImage + `[data-testid$='-${id}']`
        );
        await expect(page).toFindElement(
          customerProductsPage.button.card.addItem + `[data-testid$='-${id}']`
        );
        await expect(page).toFindElement(
          customerProductsPage.button.card.rmItem + `[data-testid$='-${id}']`
        );
        await expect(page).toFindElement(
          customerProductsPage.input.card.quantity + `[data-testid$='-${id}']`
        );
      }
    }
  );
});

describe(requirement(13), () => {
  test("O avaliador testará se o local storage contém os dados da pessoa usuária", async () => {
    const { name, email } = user.customer();

    expect((await localStorage(page, "user")).name).toEqual(name);
    expect((await localStorage(page, "user")).email).toEqual(email);
    expect((await localStorage(page, "user")).role).toEqual("customer");
  });

  test("O avaliador testará se o nome do usuário, contido no local storage, também está na navbar", async () => {
    await expect(page).toGetTextFromElement(
      customerProductsPage.element.navbar.userFullName,
      (
        await localStorage(page, "user")
      ).name
    );
  });

  test("O avaliador testará se o local storage contém um token válido", async () => {
    expect(
      !!jwt.verify((await localStorage(page, "user")).token, jwtKey)
    ).toEqual(true);
  });

  test("O avaliador testará se o logout limpa os dados da pessoa usuária local storage", async () => {
    await expect(page).toClickOnElement({ selector: customerProductsPage.element.navbar.links.logout });
    await expect(page).toCompareURL(`${host}/login`);
    expect((await localStorage(page, "user"))).toBeUndefined();
  })
});

describe(requirement(14), () => {
  const cards = products.state01;

  test("O avaliador testará se os dados de cada card condizem com os dados esperados",
    async () => {
      for(const { id, name, price, url_image: urlImage } of cards){
        await expect(page).toGetTextFromElement(
          customerProductsPage.element.card.title + `[data-testid$='-${id}']`,
          name
        );

        await expect(page).toGetTextFromElement(
          customerProductsPage.element.card.price + `[data-testid$='-${id}']`,
          price.replace(/\./, ",")
        );

        await expect(page).toFindElement(
          customerProductsPage.img.card.bgImage +
            `[data-testid$='-${id}']` +
            `[src='${urlImage}']`
        );

        const validateImage = await axios
          .get(urlImage, {
            Headers: {
              "Content-Type": "image/jpeg",
            },
          })
          .then(({ status, headers }) => ({
            status,
            contentType: headers["content-type"],
          }));

        expect(validateImage).toMatchObject({
          status: 200,
          contentType: "image/jpeg",
        });

        await expect(page).toGetValueFromElement(
          customerProductsPage.input.card.quantity + `[data-testid$='-${id}']`,
          0
        );
      }
    }
  );
});

describe(requirement(15), () => {
  const itemList = action.customer.getRandomProducts();
  showCurrentCart(itemList, requirement(15));

  const randomItem1 = itemList.cart[Math.round(itemList.cart.length - 1)];
  const randomItem2 = itemList.cart[Math.round(itemList.cart.length - 1)];
  const randomItem3 = itemList.cart[Math.round(itemList.cart.length - 1)];

  const addItem = async (productId, quantity) => {
    await expect(page).toClickOnElement({
      selector:
        customerProductsPage.button.card.addItem +
        `[data-testid$='-${productId}']`,
      clickCount: quantity,
      delay: 100,
    });

    await expect(page).toGetValueFromElement(
      customerProductsPage.input.card.quantity +
        `[data-testid$='-${productId}']`,
      String(quantity)
    );
  };

  const rmItem = async (productId, quantity) => {
    await expect(page).toClickOnElement({
      selector:
        customerProductsPage.button.card.rmItem +
        `[data-testid$='-${productId}']`,
      clickCount: quantity * 2,
      delay: 100,
    });

    await expect(page).toGetValueFromElement(
      customerProductsPage.input.card.quantity +
        `[data-testid$='-${productId}']`,
      "0"
    );
  };

  const setItem = async (productId, quantity) => {
    await expect(page).toTypeInInput(
      customerProductsPage.input.card.quantity +
        `[data-testid$='-${productId}']`,
      quantity
    );

    await expect(page).toVerifyIncludedValue(
      customerProductsPage.input.card.quantity +
        `[data-testid$='-${productId}']`,
      quantity
    );
  };

  test(`O avaliador testará se adição do item: \`${JSON.stringify(
    randomItem1
  )}\`, também altera sua quantidade`, async () => {
    const { productId, quantity } = randomItem1;

    await addItem(productId, quantity);
  });

  test(`O avaliador testará se após a adição do item: \`${JSON.stringify(
    randomItem2
  )}\`, a remoção não resultará em quantidades negativas`, async () => {
    const { productId, quantity } = randomItem2;

    await setItem(productId, quantity);
    await rmItem(productId, quantity);
    await addItem(productId, quantity);
  });

  test(`O avaliador testará se definição manual do item: \`${JSON.stringify(
    randomItem3
  )}\`, retornará o valor total correto`, async () => {
    const { productId, quantity, subTotal } = randomItem3;

    await setItem(productId, quantity);

    await expect(page).toGetTextFromElement(
      customerProductsPage.element.checkout.value,
      subTotal
    );
  });

  test("O avaliador testará o fluxo completo de adição de itens, validando o valor total de produtos", async () => {
    expect(
      await action.customer.validateProductsTotalPrice(page, itemList)
    ).toBeTruthy();
  });
});

describe(requirement(16), () => {
  test("O avaliador testará a existência de um botão de carrinho com um valor total válido e que seja capaz de nos direcionar a tela de checkout", async () => {
    const itemList = action.customer.getRandomProducts();
    showCurrentCart(itemList, global.__TESTDESC__);

    expect(true).toBe(true);
    await expect(page).toFindElement(customerProductsPage.button.cart.disabled);

    expect(
      await action.customer.validateProductsTotalPrice(page, itemList)
    ).toBeTruthy();

    await expect(page).toFindElement(
      customerProductsPage.button.cart.notDisabled
    );

    expect(
      await action.common.navigate.customer.checkout.default(page)
    ).toBeTruthy();
  });
});
