import React, { useEffect, useState } from 'react';

export default function DetailsList() {
  const [finalCart, setFinalCart] = useState();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart'));
    setFinalCart(items);
  }, []);
  return (
    <div
      className="checkout-list-container"
      style={ {
        width: '100vw',
        margin: '1vh auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center' } }
    >
      <table
        className="checkout-table"
        style={ { width: '70vw', marginLeft: '-25vw' } }
      >
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          { finalCart && finalCart.map((product, index) => (
            <tr key={ product.id }>
              <th
                data-testid={
                  `customer_order_details__element-order-table-item-number-${index}`
                }
              >
                { index + 1 }

              </th>
              <th
                data-testid={
                  `customer_order_details__element-order-table-name-${index}`
                }
              >
                { product.name }

              </th>
              <th
                data-testid={
                  `customer_order_details__element-order-table-quantity-${index}`
                }
              >
                { product.quantity }

              </th>
              <th
                data-testid={
                  `customer_order_details__element-order-table-sub-total-${index}`
                }
              >
                { (product.price / product.quantity).toFixed(2).replace(/\./, ',') }

              </th>
              <th
                data-testid={
                  `customer_order_details__element-order-total-price-${index}`
                }
              >
                { (product.price).toFixed(2).replace(/\./, ',') }

              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <h2
        data-testid="customer_order_details__element-order-total-price"
        style={ {
          width: '70vw',
          background: '#036b52',
          marginTop: '2vh',
          marginLeft: '-30vw',
          padding: '1vh 2vw',
          textAlign: 'right',
          color: 'white' } }
      >
        {finalCart && `TOTAL: R$ ${finalCart
          .map((obj) => obj.price)
          .reduce((a, b) => a + b, 0)
          .toFixed(2).replace(/\./, ',')}`}

      </h2>
    </div>
  );
}
