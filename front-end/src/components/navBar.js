import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import './navBar.css';

export default function NavBar() {
  return (
    <div className="nav">
      <ul className="navbar">
        <div className="left">
          <li className="produtos">
            <Link
              to="produtos"
              data-testid="customer_products__element-navbar-link-products"
              >
                PRODUTOS
            </Link>
          </li>
          <li >
            <Link
              to="pedidos" 
              data-testid="customer_products__element-navbar-link-orders"
              >
                MEUS PEDIDOS
            </Link>
          </li>
        </div>
        <div className="rigth">
          <li >
            <Link
              to="/"
              data-testid="customer_products__element-navbar-user-full-name"
              >
                (NOME DO USUARIO LOGADO)
            </Link>
          </li>
          <li >
            <Link
              to="logout"
              data-testid="customer_products__element-navbar-link-logout"
              >
                Sair
              </Link>
          </li>
        </div>
      </ul>
        navbar
    </div>
  );
}
