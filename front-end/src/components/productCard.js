import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import NewCartContext from '../context/newCartContext';

export default function ProductCard({ id, name, price, urlImage }) {
  const [quantity, setQuantity] = useState(0);

  const { setCart } = useContext(NewCartContext);

  const handleClick = ({ target }) => {
    const items = JSON.parse(localStorage.getItem('cart'));
    if (target.className === 'sub') {
      setQuantity(quantity - 1);
      const indexOf = items.findIndex((obj) => obj.id === id);
      items[indexOf].price -= +price;
      items[indexOf].quantity -= 1;
      localStorage.setItem('cart', JSON.stringify(items));
      setCart(items);
    }
    if (target.className === 'sum') {
      setQuantity(quantity + 1);
      const indexOf = items.findIndex((obj) => obj.id === id);
      if (indexOf < 0) {
        localStorage
          .setItem('cart', JSON
            .stringify([...items, {
              id,
              name,
              price: +price,
              quantity: 1,
              urlImage }]));
        setCart([...items, {
          id,
          name,
          price: +price,
          quantity: 1,
          urlImage }]);
      }
      items[indexOf].price += +price;
      items[indexOf].quantity += 1;
      localStorage.setItem('cart', JSON.stringify(items));
      setCart(items);
    }
  };

  const handleChange = ({ target }) => {
    setQuantity(target.value);

    const items = JSON.parse(localStorage.getItem('cart'));
    const indexOf = items.findIndex((obj) => obj.id === id);
    if (indexOf < 0) {
      localStorage
        .setItem('cart', JSON
          .stringify([...items, {
            id,
            name,
            price: +price * target.value,
            quantity: 1,
            urlImage }]));
      setCart([...items, {
        id,
        name,
        price: +price * target.value,
        quantity: 1,
        urlImage }]);
    }
    items[indexOf].price = +price * target.value;
    localStorage.setItem('cart', JSON.stringify(items));
    setCart(items);
  };

  return (
    <div
      className="card"
      style={ {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '2vh 2vw',
        background: 'white',
        width: '15vw',
        padding: '5vh 1vw',
        borderRadius: '2vw 0',
      } }
    >
      <img
        style={ { height: '30vh' } }
        className="product-img"
        alt={ name }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
      />
      <span
        className="product-name"
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        {name}
      </span>
      <span
        className="product-price"
        data-testid={ `customer_products__element-card-price-${id}` }
        style={ { margin: '0.5vh 0', fontSize: '2.3vh', fontWeight: '900'} }
      >
        { `R$ ${price.replace(/\./, ',')}` }
      </span>
      <div className="container-product-counter">
        <button
          id={ id }
          type="button"
          style={
            {
              width: '3vw',
              height: '3.4vh',
              cursor: 'pointer' }
          }
          className="sub"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          onClick={ handleClick }
          disabled={ quantity < 1 }
        >
          -
        </button>
        <input
          type="number"
          min="0"
          style={
            {
              width: '3vw',
              height: '3vh' }
          }
          className="product-quantity"
          data-testid={ `customer_products__input-card-quantity-${id}` }
          value={ quantity }
          onChange={ handleChange }
        />
        <button
          id={ id }
          type="button"
          style={
            {
              width: '3vw',
              height: '3.4vh',
              cursor: 'pointer' }
          }
          className="sum"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          onClick={ handleClick }
        >
          +
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
};
