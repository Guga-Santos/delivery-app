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
      <NavBar />
      <main
        style={ { display: 'flex', flexDirection: 'column' } }
      >
        <button
          type="button"
          data-testid="customer_products__button-cart"
          disabled={ cart.length < 1 }
          onClick={ () => navigate('/customer/checkout') }
          style={
            { height: '5vh',
              width: '22vw',
              margin: '1vh auto',
              background: '#036b52',
              color: 'white',
              fontSize: '3vh',
              border: 'none',
              borderRadius: '1vh 0',
              cursor: 'pointer' }
          }
        >
          <p data-testid="customer_products__checkout-bottom-value">
            {`Finalizar a compra: R$ ${cart
              .map((obj) => obj.price)
              .reduce((a, b) => a + b, 0)
              .toFixed(2).replace(/\./, ',')}`}
          </p>
        </button>
        <div
          style={ {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#036b52',
            paddingTop: '6vh' } }
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
