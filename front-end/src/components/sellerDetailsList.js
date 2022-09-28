import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSalesById } from '../service/api';

export default function SellerDetailsList() {
  const [order, setOrder] = useState({});
  // const [products, setProducts] = useState([]);

  const params = useParams();

  useEffect(() => {
    const getOrder = async () => {
      const { id } = params;
      const result = await getSalesById(id);
      const newDate = new Date(result.saleDate);
      const maxLength = 10;
      const dateFormat = newDate.toLocaleString('pt-br').slice(0, maxLength);
      result.saleDate = dateFormat;
      setOrder(result);
    };
    getOrder();
  }, []);

  return (
    <div
      className="list-container"
      style={ {
        width: '100vw',
        margin: '5vh auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center' } }
    >
      <h3>Detalhe do Pedido</h3>
      <ul>
        <li
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          {`PEDIDO ${params.id}`}
        </li>
        <li
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          {order.saleDate}
        </li>
        <li
          data-testid="seller_order_details__element-order-details-label-delivery-status"
        >
          { order.status }
        </li>
        <li>
          <button
            type="button"
            data-testid="seller_order_details__button-preparing-check"
          >
            PREPARAR PEDIDO
          </button>
        </li>
        <li>
          <button
            type="button"
            data-testid="seller_order_details__button-dispatch-check"
          >
            SAIU PARA ENTREGA
          </button>
        </li>
      </ul>
      <table
        className="table"
        style={ { width: '90vw' } }
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
          {/* { finalCart && finalCart.map((product, index) => (
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
          ))} */}
        </tbody>
      </table>
      <h2
        data-testid="seller_order_details__element-order-total-price"
      >
        {
          order.totalPrice && `Total: R$ ${order.totalPrice?.replace('.', ',')}`
        }

      </h2>
    </div>
  );
}
