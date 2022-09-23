import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../App.css';
import { loginRequest } from '../service/api';

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [role, setRole] = useState('');

  const passwordMin = 6;

  useEffect(() => {
    if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    && password.length >= passwordMin) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    localStorage.setItem('user', []);
  }, [email, password]);

  useEffect(() => {
    if (role === 'customer') {
      setRole('/customer/products');
      setSignIn(true);
    }
    if (role === 'seller') {
      setRole('/seller/orders');
      setSignIn(true);
    }
    if (role === 'administrator') {
      setRole('/admin/manage');
      setSignIn(true);
    }
  }, [role]);

  const handleLoginClick = async () => {
    try {
      const { user } = await loginRequest('/login', { email, password });
      localStorage.setItem('user', JSON.stringify(user));
      console.log(user.role);
      setRole(user.role);
    } catch (error) {
      console.log(error);
      setNotFound(true);
    }
  };

  return (
    <div className="login-container">
      { signIn && <Navigate to={ role } /> }
      <label htmlFor="email-input">
        <input
          type="email"
          name="email-input"
          value={ email }
          id="email-input"
          data-testid="common_login__input-email"
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password-input">
        <input
          type="password"
          name="password-input"
          value={ password }
          id="password-input"
          data-testid="common_login__input-password"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <button
        className="login-buttons"
        type="button"
        disabled={ disabled }
        data-testid="common_login__button-login"
        onClick={ handleLoginClick }
      >
        Login
      </button>
      <button
        className="login-buttons"
        type="button"
        data-testid="common_login__button-register"
        onClick={ () => navigate('/register') }
      >
        Ainda não tenho conta
      </button>
      { notFound
        && (
          <span
            data-testid="common_login__element-invalid-email"
          >
            Algo errado não está certo.
          </span>
        )}
    </div>
  );
}
