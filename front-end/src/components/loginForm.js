import React from 'react';
import '../App.css';

export default function LoginForm() {
  return (
    <div className="login-container">
      <label htmlFor="email-input">
        <input
          type="email"
          name="email-input"
          id="email-input"
          data-testid="common_login__input-email"
        />
      </label>
      <label htmlFor="password-input">
        <input
          type="password"
          name="password-input"
          id="password-input"
          data-testid="common_login__input-password"
        />
      </label>
      <button
        className="login-buttons"
        type="button"
        data-testid="common_login__button-login"
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
