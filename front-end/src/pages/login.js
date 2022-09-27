import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/loginForm';

export default function Login() {
  const [user, setUser] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const result = JSON.parse(localStorage.getItem('user'));
      setUser(result);
    };
    getUser();
  }, []);

  return (
    <div>
      { user && <Navigate to="/customer/products" /> }
      <LoginForm />
    </div>
  );
}
