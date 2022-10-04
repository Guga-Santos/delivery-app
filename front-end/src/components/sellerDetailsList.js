/* eslint-disable sonarjs/no-duplicate-string */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsBySaleId, getSalesById, updateSaleStatus } from '../service/api';

export default function SellerDetailsList() {
  const [order, setOrder] = useState({});

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
    const getProducts = async () => {
      const { id } = params;
      const result = await getProductsBySaleId(id);
      setProducts(result);
    };
    getOrder();
    getProducts();
  }, [params]);

  const handleClick = async (status) => {
    try {
      await updateSaleStatus({ status }, params.id);
      getOrder();
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="list-container"
      style={ {
        width: '12vw',
        height: '30vh',
        padding: '2vh 0 1vh .5vw',
        margin: '5vh auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid black' } }
    >
      <h3 style={ { margin: '0 0 2vh -.5vw' } }>Detalhe do Pedido</h3>
      <ul style={ { listStyleType: 'none' } }>
        <li
          data-testid="seller_order_details__element-order-details-label-order-id"
          style={ { margin: '0.5vh 0 .5vh -.4vw' } }
        >
          {`PEDIDO ${params.id}`}
        </li>
        <li
          data-testid="seller_order_details__element-order-details-label-order-date"
          style={ { margin: '.5vh 0 0.5vh -.4vw' } }
        >
          {`Data: ${order.saleDate}`}
        </li>
        <li
          data-testid="seller_order_details__element-order-details-label-delivery-status"
          style={ { margin: '0.5vh 0 0.5vh -.4vw' } }
        >
          { `Status: ${order.status}` }
        </li>
        <li>
          <button
            type="button"
            data-testid="seller_order_details__button-preparing-check"
            disabled={ order.status !== 'Pendente' }
            style={
              { margin: '.5vh 0 .5vh -0.5vw',
                width: '10vw',
                height: '4vh',
                background: '#04bb90',
                border: 'none' }
            }
            onClick={ () => handleClick('Preparando') }
          >
            PREPARAR PEDIDO
          </button>
        </li>
        <li>
          <button
            type="button"
            data-testid="seller_order_details__button-dispatch-check"
            disabled={ order.status !== 'Preparando' }
            style={
              { margin: '.5vh 0 2vh -.5vw',
                width: '10vw',
                height: '4vh',
                background: '#04bb90',
                border: 'none' }
            }
            onClick={ () => handleClick('Em Trânsito') }
          >
            SAIU PARA ENTREGA
          </button>
        </li>
      </ul>
      <h2
        data-testid="seller_order_details__element-order-total-price"
        style={
          {
            background: '#036b52',
            width: '10vw',
            padding: '1vh 0',
            textAlign: 'center',
            marginLeft: '-0.5vw',
            color: 'white' }
        }
      >
        {
          order.totalPrice && `Total: R$ ${order.totalPrice?.replace('.', ',')}`
        }

      </h2>
    </div>
  );
}
