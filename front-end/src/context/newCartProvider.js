import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import NewCartContext from './newCartContext';

export default function NewCartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart'));
    setCart(items);
  }, []);

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
