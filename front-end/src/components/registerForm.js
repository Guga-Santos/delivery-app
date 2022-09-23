import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerRequest } from '../service/api';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [notFound, setNotFound] = useState(false);

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

  const handleRegisterClick = async () => {
    try {
      await registerRequest('/register', { name, email, password });
      navigate('/customer/products');
    } catch (error) {
      console.log(error);
      setNotFound(true);
    }
  };

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
        onClick={ handleRegisterClick }
      >
        CADASTRAR
      </button>
      { notFound
        && (
          <span
            data-testid="common_register__element-invalid_register"
          >
            Seu nome ou email já existem.
          </span>
        )}
    </div>
  );
}
