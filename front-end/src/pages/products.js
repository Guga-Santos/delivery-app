import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/navBar';
import ProductCard from '../components/productCard';
import NewCartContext from '../context/newCartContext';
import { getAllProducts } from '../service/api';

export default function Products() {
  const [products, setProducts] = useState();
  const { cart, setCart } = useContext(NewCartContext);

  useEffect(() => {
    const findAllProducts = async () => {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    };
    const getLocal = JSON.parse(localStorage.getItem('cart'));
    if (!getLocal) {
      localStorage.setItem('cart', JSON.stringify([]));
      setCart([]);
    } else {
      setCart(getLocal);
    }
    findAllProducts();
  }, [setCart]);

  const navigate = useNavigate();

  return (
    <div>
      <NavBar>produtos</NavBar>
      <main
        style={ { display: 'flex', flexDirection: 'column' } }
      >
        <button
          type="button"
          data-testid="customer_products__button-cart"
          disabled={ cart.length < 1 }
          onClick={ () => navigate('/customer/checkout') }
          style={ { height: '4vh', width: '6vw' } }
        >
          <p data-testid="customer_products__checkout-bottom-value">
            {cart
              .map((obj) => obj.price)
              .reduce((a, b) => a + b, 0)
              .toFixed(2).replace(/\./, ',')}
          </p>
        </button>
        <div
          style={ {
            display: 'flex',
            flexWrap: 'wrap' } }
        >
          {
            products?.map((product, index) => (
              <ProductCard
                key={ product.id }
                id={ index + 1 }
                name={ product.name }
                price={ product.price }
                urlImage={ product.urlImage }
              />
            ))
          }
        </div>
      </main>
    </div>
  );
}
