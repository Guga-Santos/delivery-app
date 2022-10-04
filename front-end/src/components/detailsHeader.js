import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllSales, updateSaleStatus } from '../service/api';
import DetailsList from './detailsList';

const moment = require('moment');

const testStr = 'customer_order_details__';

export default function DetailsHeader() {
  const [seller, setSeller] = useState();
  const [sales, setSales] = useState([]);
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

  const handleClick = async (status) => {
    try {
      await updateSaleStatus({ status }, params.id);
      getSales();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={
        {
          background: 'white',
          width: '70vw',
          padding: '1vh 2vw',
          border: '1vw solid white',
          borderRadius: '1vw' }
      }
    >
      <h2 style={ { marginBottom: '1vh', marginLeft: '-2vw' } }>
        DETALHES DO PEDIDO:
      </h2>
      <label htmlFor="order-id">
        <h3
          id="order-id"
          data-testid={ `${testStr}element-order-details-label-order-id` }
          style={ {
            width: '70vw',
            background: '#036b52',
            marginTop: '2vh',
            marginLeft: '-2vw',
            padding: '1vh 2vw',
            textAlign: 'left',
            color: 'white' } }
        >
          Pedido
          {' '}
          {params.id}
        </h3>
      </label>
      <DetailsList />
      <div
        style={
          {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '2vh' }
        }
      >
        <div>
          <label htmlFor="seller-name">
            <h4
              id="seller-name"
              data-testid={ `${testStr}element-order-details-label-seller-name` }
            >
              Pessoa Vendedora
              {seller && `: ${seller.name}`}
            </h4>
          </label>
          <label htmlFor="order-date">
            <h4
              id="order-date"
              data-testid={ `${testStr}element-order-details-label-order-date` }
            >
              {`Data do pedido: ${newdate}`}
            </h4>
          </label>
        </div>
        <label htmlFor="delivery-status">
          <h2
            id="delivery-status"
            data-testid={ `${testStr}order-details-label-delivery-status` }
          >
            {`Status: ${sales?.status}`}
          </h2>
        </label>
        <button
          type="button"
          data-testid={ `${testStr}button-delivery-check` }
          disabled={ sales.status !== 'Em Trânsito' }
          style={
            {
              height: '4vh',
              width: '15vw',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '900',
              fontSize: '1.5vh',
              background: '#04bb90' }
          }
          onClick={ () => handleClick('Entregue') }
        >
          MARCAR COMO ENTREGUE
        </button>
      </div>
    </div>
  );
}
