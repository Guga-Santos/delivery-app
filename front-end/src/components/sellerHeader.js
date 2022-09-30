import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SellerHeader() {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <div>
      <ul className="navbar">
        <div className="left">
          <Link to="/seller/orders">
            <li
              data-testid="customer_products__element-navbar-link-orders"
            >
              PEDIDOS
            </li>
          </Link>
        </div>
        <div className="rigth">
          <li
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { user?.name }
          </li>
          <li>
            <Link
              to="/"
              data-testid="customer_products__element-navbar-link-logout"
              onClick={ () => localStorage.removeItem('user') }
            >
              Sair
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
}
