import React, { useEffect, useState } from 'react';

export default function CheckoutList() {
  const [finalCart, setFinalCart] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart'));
    setFinalCart(items);
  }, [refresh]);

  const handleClick = ({ target }) => {
    const filter = finalCart.filter((product) => product.name !== target.id);
    console.log(filter);
    setFinalCart(filter);
    localStorage.setItem('cart', JSON.stringify(filter));
    setRefresh(!refresh);
  };

  return (
    <div
      className="checkout-list-container"
      style={ {
        width: '100vw',
        margin: '5vh auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center' } }
    >
      <h1
        style={
          {
            width: '100%',
            padding: '1vh 0',
            textAlign: 'center',
            background: '#036b52',
            color: 'white' }
        }
      >
        Detalhes do Pedido:

      </h1>
      <table
        className="checkout-table"
        style={ { width: '70vw' } }
      >
        <thead>
          <tr>
            <th style={ { height: '4vh', width: '6vw' } }>Item</th>
            <th style={ { height: '4vh', width: '30vw' } }>Descrição</th>
            <th style={ { height: '4vh', width: '10vw' } }>Quantidade</th>
            <th style={ { height: '4vh', width: '10vw' } }>Valor Unitário</th>
            <th style={ { height: '4vh', width: '6vw' } }>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          { finalCart && finalCart.map((product, index) => (
            <tr key={ product.id }>
              <th
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                { index + 1 }

              </th>
              <th
                data-testid={
                  `customer_checkout__element-order-table-name-${index}`
                }
              >
                { product.name }

              </th>
              <th
                data-testid={
                  `customer_checkout__element-order-table-quantity-${index}`
                }
              >
                { product.quantity }

              </th>
              <th
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                { `R$ ${(product.price / product.quantity)
                  .toFixed(2).replace(/\./, ',')}` }

              </th>
              <th
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                { `R$ ${(product.price).toFixed(2).replace(/\./, ',')}` }

              </th>
              <th>
                <button
                  id={ product.name }
                  data-testid={
                    `customer_checkout__element-order-table-remove-${index}`
                  }
                  type="button"
                  onClick={ (e) => handleClick(e) }
                  style={
                    {
                      width: '10vw',
                      padding: '0.5vh 0',
                      textAlign: 'center',
                      background: '#036b52',
                      border: 'none',
                      color: 'white',
                      cursor: 'pointer' }
                  }
                >
                  Remover
                </button>

              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <h2
        data-testid="customer_checkout__element-order-total-price"
        style={
          {
            width: '100%',
            padding: '1vh 0',
            textAlign: 'center',
            background: '#036b52',
            color: 'white',
            marginTop: '2vh' }
        }
      >
        {finalCart && `TOTAL: R$ ${finalCart
          .map((obj) => obj.price)
          .reduce((a, b) => a + b, 0)
          .toFixed(2).replace(/\./, ',')}`}

      </h2>
    </div>
  );
}
