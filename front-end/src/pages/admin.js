import React, { useContext } from 'react';
import AdminHeader from '../components/HeaderAdmin';
import NewUserForm from '../components/newUserForm';
import UsersList from '../components/userList';
import NewUserContext from '../context/newUserContext';

export default function AdminArea() {
  const { exist } = useContext(NewUserContext);
  return (
    <div className="admin-page-container">
      <AdminHeader />
      <NewUserForm />
      <UsersList />
      {exist && (
        <h3
          data-testid="admin_manage__element-invalid-register"
          style={ { width: '100vw', textAlign: 'center' } }
        >
          Tá maluco, mano?!

        </h3>
      )}
    </div>
  );
}
