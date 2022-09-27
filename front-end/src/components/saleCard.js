import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import './saleCard.css';
import { Link } from 'react-router-dom';

export default function SaleCard({ key, id, status, date, totalPrice, address }) {
  return (
    <Link to={ `seller/order/${id}` } key={ key } className="sale-card">
      <div className="container-order">
        <span>Pedido</span>
        <span data-testid={ `seller_orders__element-order-id-${id}` }>{id}</span>
      </div>
      <div className="container-order-info">
        <div className="container-order-top">
          <div className="container-order-status">
            <span data-testid={ `seller_orders__element-delivery-status-${id}` }>
              {status}
            </span>
          </div>
          <div className="container-order-others">
            <span data-testid={ `seller_orders__element-order-date-${id}` }>
              {date}
            </span>
            <span data-testid={ `seller_orders__element-card-price-${id}` }>
              {`R$ ${totalPrice}`}
            </span>
          </div>
        </div>
        <div className="container-order-bottom">
          <span data-testid={ `seller_orders__element-card-address-${id}` }>
            {address}
          </span>
        </div>
      </div>
    </Link>
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
