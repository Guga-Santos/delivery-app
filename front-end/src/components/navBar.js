import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import './navBar.css';

export default function NavBar() {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <div className="nav">
      <ul className="navbar">
        <div className="left">
          <li className="produtos">
            <Link
              to="../customer/products"
              data-testid="customer_products__element-navbar-link-products"
            >
              PRODUTOS
            </Link>
          </li>
          <li>
            <Link
              to="pedidos"
              data-testid="customer_products__element-navbar-link-orders"
            >
              MEUS PEDIDOS
            </Link>
          </li>
        </div>
        <div className="rigth">
          <li>
            <Link
              to="/"
              data-testid="customer_products__element-navbar-user-full-name"
            >
              { user?.name }
            </Link>
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
