const forceExcludeItens = require("../common/forceExcludeItens");

const cartReduced = (itemList) => {
  const productList = itemList.cart
    .map((el,index)=> ({ listItem: index + 1, ...el  }));

  const excludeItens = forceExcludeItens(productList);
  
  const productsToExclude = productList
    .filter((el) => excludeItens.includes(el.listItem));

  const newProductList = productList
    .filter(({listItem}) => !excludeItens.includes(listItem))
    .map((el,index)=> ({ ...el, listItem: index + 1 }));

  const newListTotalPrice = newProductList.reduce((acc, curr)=> Number(acc) + Number(curr.subTotal.replace(/,/, '.')), 0);

  productList.map(el => delete el.productId && el);
  excludeItens.map(el => delete el.productId && el);
  newProductList.map(el => delete el.productId && el);

  const newCart = { cart: newProductList, totalPrice: String(newListTotalPrice.toFixed(2)).replace(/\./, ',') };

  return {
    productList, 
    productsToExclude, 
    newCart
  }
};

module.exports = cartReduced;
