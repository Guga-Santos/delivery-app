const showCurrentOrderInfo = (order, requirement) => {
  console.log(
    `Dados do pedido utilizada no teste:\n`+
    `\`${requirement}\`\n`);
  console.table(order);
}

module.exports = showCurrentOrderInfo;
