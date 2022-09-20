const showCurrentCart = (itemList, requirement, message) => {
  console.log(
    (message ? `"${message}"\n` : '')+
    `Amostragem de itens utilizada no teste:\n`+
    `\`${requirement}\`\n` +
    (itemList.totalPrice ? `Preço total: ${itemList.totalPrice}` : '')
  );
  console.table(itemList.cart.map((el) => delete el.id && el));
}

module.exports = showCurrentCart;
