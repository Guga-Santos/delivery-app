import React, { useEffect, useState } from 'react';
import '../App.css';
import { loginRequest } from '../service/api';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const passwordMin = 6;

  useEffect(() => {
    if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    && password.length >= passwordMin) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const handleLoginClick = async () => {
    const test = await loginRequest('/login', { email, password });
    console.log(test);
  };

  return (
    <div className="login-container">
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
      >
        Ainda não tenho conta
      </button>
    </div>
  );
}
