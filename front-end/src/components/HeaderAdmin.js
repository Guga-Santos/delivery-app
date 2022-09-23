import React from 'react';

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
      </nav>
    </header>
  );
}
