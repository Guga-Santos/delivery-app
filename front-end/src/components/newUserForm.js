import React, { useContext, useEffect, useState } from 'react';
import NewUserContext from '../context/newUserContext';
import { createUserRequest } from '../service/api';

const MIN_NAME_LENGTH = 12;
const MIN_PASS_LENGTH = 6;

export default function NewUserForm() {
  const context = useContext(NewUserContext);

  const [disable, setDisable] = useState(true);

  const {
    refresh,
    setRefresh,
    newUserName,
    setNewUserName,
    newUserEmail,
    setNewUserEmail,
    newUserPassword,
    setNewUserPassword,
    newUserRole,
    setNewUserRole,
    setExist,
  } = context;

  useEffect(() => {
    setDisable(true);
    if (
      newUserName.length >= MIN_NAME_LENGTH
      && newUserPassword.length >= MIN_PASS_LENGTH
      && newUserEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      && newUserRole !== '') {
      setDisable(false);

      // Fazer um helper depois!
    }
  }, [newUserName, newUserPassword, newUserEmail, newUserRole]);

  const handleClick = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      await createUserRequest({
        name: newUserName,
        email: newUserEmail,
        password: newUserPassword,
        role: newUserRole,
      }, user.token);
      setRefresh(!refresh);
      setNewUserEmail('');
      setNewUserName('');
      setNewUserPassword('');
      setNewUserRole('customer');
    } catch (err) {
      setExist(true);
      setRefresh(!refresh);
      setNewUserEmail('');
      setNewUserName('');
      setNewUserPassword('');
      setNewUserRole('customer');
    }
  };

  return (
    <div className="newform-container">
      <h4>Cadastrar novo usuário</h4>
      <div className="inputs-container">
        <label htmlFor="input-name">
          <span>Nome</span>
          <input
            type="text"
            id="input-name"
            name="input-name"
            data-testid="admin_manage__input-name"
            value={ newUserName }
            onChange={ ({ target }) => {
              setNewUserName(target.value);
              setExist(false);
            } }
          />
        </label>
        <label htmlFor="input-email">
          <span>Email</span>
          <input
            type="email"
            id="input-email"
            name="input-email"
            data-testid="admin_manage__input-email"
            value={ newUserEmail }
            onChange={ ({ target }) => setNewUserEmail(target.value) }
          />
        </label>
        <label htmlFor="input-password">
          <span>Senha</span>
          <input
            type="password"
            id="input-password"
            name="input-password"
            data-testid="admin_manage__input-password"
            value={ newUserPassword }
            onChange={ ({ target }) => setNewUserPassword(target.value) }
          />
        </label>
        <label htmlFor="input-password">
          <span>Tipo</span>
          <select
            id="select-input"
            data-testid="admin_manage__select-role"
            value={ newUserRole }
            onChange={ ({ target }) => setNewUserRole(target.value) }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>
        <button
          id="register-button"
          type="button"
          data-testid="admin_manage__button-register"
          onClick={ handleClick }
          disabled={ disable }
        >
          Cadastrar
        </button>

      </div>
    </div>
  );
}
