/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/jsx-indent-props */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import drink from '../assets/drink.png';
import logout from '../assets/logout.png';
import order from '../assets/order.png';
import userlogo from '../assets/userlogo.png';
import './navBar.css';

export default function NavBar() {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const renderNavBar = () => (
    <ul className="navbar">
      <div className="left">
        <li className="produtos">
          <Link
            to="../customer/products"
            data-testid="customer_products__element-navbar-link-products"
          >
            <img
              src={ drink }
              alt="user logo"
              style={
                {
                  width: '1.5vw',
                  marginLeft: '-2vw',
                  position: 'absolute' }
              }
            />
            PRODUTOS
          </Link>
        </li>
        <li>
          <Link
            to="/customer/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            <img
              src={ order }
              alt="user logo"
              style={
                {
                  width: '1.5vw',
                  marginLeft: '-1.7vw',
                  position: 'absolute' }
              }
            />
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
            <img
              src={ userlogo }
              alt="user logo"
              style={
                {
                  width: '1.5vw',
                  marginLeft: '-2vw',
                  position: 'absolute' }
              }
            />
            { user?.name.toUpperCase() }
          </Link>
        </li>
        <li>
          <Link
            to="/"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => localStorage.removeItem('user') }
          >
            Sair
            <img
              src={ logout }
              alt="logout logo"
              style={
                {
                  width: '1.5vw',
                  marginLeft: '.5vw',
                  position: 'absolute' }
              }
            />
          </Link>
        </li>
      </div>
    </ul>
  );

  return (
    <div className="nav">
      { renderNavBar() }
    </div>
  );
}
