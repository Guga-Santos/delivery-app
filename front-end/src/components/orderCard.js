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
    >
      <div
        data-testid={ `customer_orders__element-order-id-${id}` }
      >
        { id }
      </div>
      <div
        data-testid={ `customer_orders__element-delivery-status-${id}` }
      >
        { status }
      </div>
      <div
        data-testid={ `customer_orders__element-order-date-${id}` }
      >
        { date }
      </div>
      <div
        data-testid={ `customer_orders__element-card-price-${id}` }
      >
        { totalPrice.replace('.', ',') }
      </div>
    </button>
  );
}

OrderCard.propTypes = {
  orderId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  saleDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
