import PropTypes from 'prop-types';
import React from 'react';

export default function OrderCard({ id, status, saleDate, totalPrice }) {
  return (
    <div>
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
        { saleDate }
      </div>
      <div
        data-testid={ `customer_orders__element-card-price-${id}` }
      >
        { totalPrice }
      </div>
    </div>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  saleDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
