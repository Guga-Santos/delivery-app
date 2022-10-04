/* eslint-disable sonarjs/no-duplicate-string */
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SaleCard({ key, id, status, date, totalPrice, address }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={ () => navigate(`/seller/orders/${id}`) }
      key={ key }
      style={
        {
          width: '70vw',
          margin: '2vh 0',
          display: 'flex',
          padding: '2vh 2vw',
          position: 'relative',
          background: '#04bb90',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '0 0 0 1vh' }
      }
      className="sale-card"
    >
      <div
        className="container-order"
        style={ { display: 'flex', alignItems: 'center' } }
      >
        <h2 style={ { marginRight: '1vw' } }>Pedido: </h2>
        <h4
          style={ { fontSize: '2vh' } }
          data-testid={ `seller_orders__element-order-id-${id}` }
        >
          {id}

        </h4>
      </div>

      <div
        className="container-order-status"
        style={ { margin: '.5vh 0 .5vh -1vw' } }
      >
        <span
          style={ { fontSize: '1.5vh', position: 'absolute', left: '12vw' } }
          data-testid={ `seller_orders__element-delivery-status-${id}` }
        >
          {`Status: ${status}`}
        </span>
      </div>
      <span
        data-testid={ `seller_orders__element-order-date-${id}` }
        style={ { position: 'absolute', left: '25vw', margin: '.5vh 0 .5vh -1vw' } }
      >
        {`Data do pedido: ${date}`}
      </span>
      <span
        data-testid={ `seller_orders__element-card-price-${id}` }
        style={ { position: 'absolute', left: '40vw', margin: '.5vh 0 .5vh -1vw' } }
      >
        {`Total: R$ ${totalPrice}`}
      </span>

      <div
        className="container-order-bottom"
        style={ { position: 'absolute', left: '50vw', margin: '.5vh 0 .5vh -1vw' } }
      >
        <span data-testid={ `seller_orders__element-card-address-${id}` }>
          {` Endereço de entrega: R${address}`}
        </span>
      </div>

    </button>
  );
}

SaleCard.propTypes = {
  key: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};
