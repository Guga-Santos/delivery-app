import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllSales } from '../service/api';

const moment = require('moment');

export default function DetailsList() {
  const [seller, setSeller] = useState();
  const [salesDate, setSalesDate] = useState();
  // const [salesStatus, setSaleStatus] = useState('aaaaa');
  const params = useParams();

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem('sellerInfo'));
    const getSales = async () => {
      const filterResult = await getAllSales();

      return filterResult.filter((sale) => sale.id === params.id);
    };
    setSalesDate(getSales()[0]?.saleDate);
    // setSaleStatus(getSales()[0]?.status);
    setSeller(result);
  }, [params.id]);
  const newdate = moment(salesDate).locale('pt-br').format('DD/MM/YYYY');

  return (
    <>
      <h2>
        Detalhe do Pedido
      </h2>
      <ol>
        <li
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          PEDIDO
          {' '}
          {params.id}
        </li>
        <li
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          P. Vend:
          {seller && seller.name}
        </li>
        <li
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          {newdate}
        </li>
        <li
          data-testid="
          customer_order_details__element-order-details-label-delivery-status"
        >
          ENTREGUE

        </li>
      </ol>
      <button
        type="button"
        data-testid="customer_order_details__button-delivery-check"
      >
        MARCAR COMO ENTREGUE

      </button>
    </>
  );
}
