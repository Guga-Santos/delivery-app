const { one } = require('../../../config/constants').common;

const forceExcludeItens = (itemList, idOffset = 0) => {
  const itens = [];

  for (let i = one + idOffset; i <= itemList.length + idOffset; i+= one){
    if(Math.round(Math.random())) {
      itens.push(i);
    }
  }

  return (!itens.length || itens.length >= itemList.length) ?
    forceExcludeItens(itemList, idOffset) : itens;
}

module.exports = forceExcludeItens;
