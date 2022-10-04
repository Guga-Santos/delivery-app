import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logout from '../assets/logout.png';
import order from '../assets/order.png';
import userlogo from '../assets/userlogo.png';

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
            <li
              data-testid="customer_products__element-navbar-link-orders"
              style={ { color: 'white', fontWeight: '900' } }
            >
              PEDIDOS
            </li>
          </Link>
        </div>
        <div className="rigth">
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
          <li
            data-testid="customer_products__element-navbar-user-full-name"
            style={ { color: 'white' } }
          >
            { user?.name.toUpperCase() }
          </li>
          <Link
            to="/"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => localStorage.removeItem('user') }
            style={ { display: 'flex', color: 'white', border: 'none' } }
          >
            <li style={ { marginLeft: '-2vw' } }>
              Sair
            </li>
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
        </div>
      </ul>
    </div>
  );
}
