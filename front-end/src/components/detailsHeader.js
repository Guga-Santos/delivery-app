import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllSales } from '../service/api';

const moment = require('moment');

export default function DetailsList() {
  const [seller, setSeller] = useState();
  const [sales, setSales] = useState();
  const params = useParams();

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem('sellerInfo'));
    const getSales = async () => {
      const findResult = await getAllSales();
      const teste = findResult.find((sale) => sale.id === Number(params.id));

      return setSales(teste);
    };
    getSales();
    setSeller(result);
  }, [params.id]);
  const newdate = moment(sales?.saleDate).locale('pt-br').format('DD/MM/YYYY');
  return (
    <>
      <h2>
        Detalhe do Pedido
      </h2>
      <label htmlFor="order-id">
        <h2
          id="order-id"
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          PEDIDO
          {' '}
          {params.id}
        </h2>
      </label>
      <label htmlFor="seller-name">
        <h2
          id="seller-name"
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          P. Vend:
          {seller && seller.name}
        </h2>
      </label>
      <label htmlFor="order-date">
        <h2
          id="order-date"
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          {newdate}
        </h2>
      </label>
      <label htmlFor="delivery-status">
        <h2
          id="delivery-status"
          data-testid={ 'customer_order_details__element-'
          + 'order-details-label-delivery-status' }
        >
          {sales?.status}
        </h2>
      </label>
      <button
        type="button"
        data-testid="customer_order_details__button-delivery-check"
        disabled
      >
        MARCAR COMO ENTREGUE
      </button>
    </>
  );
}
