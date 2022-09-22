import React from 'react';
import AdminHeader from '../components/HeaderAdmin';
import NewUserForm from '../components/newUserForm';
import UsersList from '../components/userList';

export default function AdminArea() {
  return (
    <div className="admin-page-container">
      <AdminHeader />
      <NewUserForm />
      <UsersList />
    </div>
  );
}
