import React, { useEffect, useState } from 'react';
import NavBar from '../components/navBar';
import ProductCard from '../components/productCard';
import { getAllProducts } from '../service/api';

export default function Products() {
  const [products, setProducts] = useState();

  useEffect(() => {
    const findAllProducts = async () => {
      const allProducts = await getAllProducts();
      setProducts(allProducts);

      setUser(JSON.parse(localStorage.getItem('user')));
    };

    findAllProducts();
  }, []);

  return (
    <div>
      <NavBar>produtos</NavBar>
      <main
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
              urlImage={ product.url_image }
            />
          ))
        }
      </main>
    </div>
  );
}
