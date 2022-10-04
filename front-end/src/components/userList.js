import React, { useContext, useEffect, useState } from 'react';
import NewUserContext from '../context/newUserContext';
import { usersRequest } from '../service/api';

export default function UsersList() {
  const context = useContext(NewUserContext);
  const { refresh } = context;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = await usersRequest('/users');
      setUsers(allUsers.data);
    };
    getUsers();
  }, [refresh]);

  return (
    <div className="userlist-container">
      <h4>Lista de usuários</h4>
      <table>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Tipo</th>
          <th>Excluir</th>
        </tr>
        {users.map((user, i) => (
          <tr key={ i }>
            <th
              data-testid={ `admin_manage__element-user-table-item-number-${i + 1}` }
            >
              {i + 1}
            </th>
            <th
              data-testid={ `admin_manage__element-user-table-name-${i + 1}` }
            >
              { user.name }
            </th>
            <th
              data-testid={ `admin_manage__element-user-table-email-${i + 1}` }
            >
              { user.email }
            </th>
            <th data-testid={ `admin_manage__element-user-table-role-${i + 1}` }>
              { user.role }
            </th>
            <th>
              <button
                type="button"
                data-testid={ `admin_manage__element-user-table-remove-${i + 1}` }
                style={
                  {
                    border: 'none',
                    cursor: 'pointer',
                    background: '#04bb90',
                    padding: '.5vh 2vw' }
                }
              >
                Excluir
              </button>
            </th>
          </tr>
        ))}
      </table>
    </div>
  );
}
