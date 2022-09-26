import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoggedNavBar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="logged-in-navbar">
      <div>
        <button
          className="navbar-link-products"
          type="button"
          data-testid="customer_products__element-navbar-link-products"
          onClick={ () => navigate('/customer/products') }
        >
          PRODUTOS
        </button>
        <button
          className="navbar-link-orders"
          type="button"
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ () => navigate('/customer/checkout') }
        >
          MEUS PEDIDOS
        </button>
      </div>
      <div>
        <button
          className="navbar-user-full-name"
          type="button"
          data-testid="customer_products__element-navbar-user-full-name"
          onClick={ () => navigate('/customer') }
        >
          { user }
        </button>
        <button
          className="navbar-link-logout"
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => navigate('/login') }
        >
          Sair
        </button>
      </div>
    </div>
  );
}
