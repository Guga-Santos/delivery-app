import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderCard({ orderId, id, status, saleDate, totalPrice }) {
  const navigate = useNavigate();
  const [date, setDate] = useState('');

  useEffect(() => {
    const formatDate = async () => {
      const newDate = new Date(saleDate);
      const maxLength = 11;
      const dateFormat = newDate.toLocaleString('pt-br').slice(0, maxLength);
      setDate(dateFormat);
    };
    formatDate();
  }, [saleDate]);

  return (
    <button
      type="button"
      onClick={ () => navigate(`/customer/orders/${orderId}`) }
      style={ {
        width: '10vw',
        height: '15vh',
        border: 'none',
        borderRadius: '1vw 0',
        margin: '2vh 2vw',
        cursor: 'pointer',
        background: '#04bb90',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center' } }
    >
      <div
        data-testid={ `customer_orders__element-order-id-${id}` }
        style={ {
          fontSize: '2.2vh',
          background: 'white',
          padding: '1vh 1vw',
          borderRadius: '50%',
          marginBottom: '1.5vh' } }
      >
        { id }
      </div>
      <div
        data-testid={ `customer_orders__element-delivery-status-${id}` }
        style={ {
          fontSize: '2.2vh',
          color: 'white' } }
      >
        { status }
      </div>
      <div
        style={ {
          fontSize: '1.5vh',
          color: 'white' } }
        data-testid={ `customer_orders__element-order-date-${id}` }
      >
        { date }
      </div>
      <div
        style={ {
          fontSize: '1.5vh',
          color: 'white',
          fontWeight: '900',
          marginTop: '1vh' } }
        data-testid={ `customer_orders__element-card-price-${id}` }
      >
        { `R$ ${totalPrice.replace('.', ',')}` }
      </div>
    </button>
  );
}

OrderCard.propTypes = {
  orderId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  totalPrice: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
