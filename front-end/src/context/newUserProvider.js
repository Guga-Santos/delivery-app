/* eslint-disable react/jsx-no-constructed-context-values */
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import NewUserContext from './newUserContext';

export default function NewUserProvider({ children }) {
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState('');
  const [newUser, setNewUser] = useState({});

  const context = useMemo(() => ({
    newUser,
    setNewUser,
    newUserName,
    setNewUserName,
    newUserEmail,
    setNewUserEmail,
    newUserPassword,
    setNewUserPassword,
    newUserRole,
    setNewUserRole,
  }), [
    newUser,
    newUserEmail,
    newUserName,
    newUserPassword,
    newUserRole]);

  return (
    <NewUserContext.Provider value={ context }>
      { children }
    </NewUserContext.Provider>
  );
}

NewUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
