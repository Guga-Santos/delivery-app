import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import NewCartContext from './newCartContext';

export default function NewCartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const context = useMemo(() => ({
    cart,
    setCart,
  }), [cart]);

  return (
    <NewCartContext.Provider value={ context }>
      { children }
    </NewCartContext.Provider>
  );
}

NewCartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
