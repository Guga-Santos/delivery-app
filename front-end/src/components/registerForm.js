import React from 'react';

export default function RegisterForm() {
  return (
    <div className="register-container">
      <label htmlFor="name-input">
        <input
          type="text"
          name="name-input"
          id="name-input"
          data-testid="common_register__input-name"
        />
      </label>
      <label htmlFor="email-input">
        <input
          type="email"
          name="email-input"
          id="email-input"
          data-testid="common_register__input-email"
        />
      </label>
      <label htmlFor="password-input">
        <input
          type="password"
          name="password-input"
          id="password-input"
          data-testid="common_register__input-password"
        />
      </label>
      <button
        className="register-buttons"
        type="button"
        data-testid="common_register__button-register"
      >
        CADASTRAR
      </button>
    </div>
  );
}
