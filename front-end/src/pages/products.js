import React, { useContext, useEffect, useState } from 'react';
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

  return (
    <div>
      <NavBar>produtos</NavBar>
      <main
        style={ {
          display: 'flex',
          flexWrap: 'wrap' } }
      >
        <p data-testid="customer_products__checkout-bottom-value">
          {cart
            .map((obj) => obj.price)
            .reduce((a, b) => a + b, 0)
            .toFixed(2).replace(/\./, ',')}
        </p>
        {
          products?.map((product, index) => (
            <ProductCard
              key={ product.id }
              id={ index + 1 }
              name={ product.name }
              price={ product.price }
              urlImage={ product.url_image }
            />
          ))
        }
      </main>
    </div>
  );
}
