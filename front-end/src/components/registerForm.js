import React, { useEffect, useState } from 'react';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const nameMin = 12;
  const passwordMin = 6;
  useEffect(() => {
    if (
      name.length >= nameMin
      && email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      && password.length >= passwordMin
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, email, password]);

  return (
    <div className="register-container">
      <label htmlFor="name-input">
        <input
          type="text"
          name="name-input"
          value={ name }
          id="name-input"
          data-testid="common_register__input-name"
          onChange={ ({ target }) => setName(target.value) }
        />
      </label>
      <label htmlFor="email-input">
        <input
          type="email"
          name="email-input"
          value={ email }
          id="email-input"
          data-testid="common_register__input-email"
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password-input">
        <input
          type="password"
          name="password-input"
          value={ password }
          id="password-input"
          data-testid="common_register__input-password"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <button
        className="register-buttons"
        type="button"
        disabled={ disabled }
        data-testid="common_register__button-register"
      >
        CADASTRAR
      </button>
    </div>
  );
}
