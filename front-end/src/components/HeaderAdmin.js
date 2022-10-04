import React from 'react';
import { Link } from 'react-router-dom';
import logout from '../assets/logout.png';

export default function AdminHeader() {
  return (
    <header className="admin-header-container">
      <nav className="nav-container">
        <h4
          style={ {
            background: '#2FC18C',
            width: '20vw',
            padding: '5vh 0',
            textAlign: 'center',
          } }
        >
          GERENCIAR USUÁRIOS

        </h4>
        <Link
          to="/"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => localStorage.removeItem('user') }
          style={ { display: 'flex', color: 'white', border: 'none' } }
        >
          <h4 style={ { marginLeft: '-8vw' } }>
            Sair
          </h4>
          <img
            src={ logout }
            alt="logout logo"
            style={
              {
                width: '1.5vw',
                marginLeft: '-5.5vw',
                position: 'absolute' }
            }
          />
        </Link>
      </nav>
    </header>
  );
}
