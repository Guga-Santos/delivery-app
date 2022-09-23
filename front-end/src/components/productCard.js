import React, { useState } from "react";


export default function ProductCard(props) {
  const [quantity, setQuantity] = useState(0);
  return(
    <div key={props.id}

      className="card"
      >
      <span
        className="product-price"
        data-testid={`customer_products__element-card-price-${props.id}`}
        >
        {props.price}
      </span>
      <img className="product-img" src={props.url_image}></img>
      <span
        className="product-name"
        data-testid={`customer_products__img-card-bg-image-${props.id}`}
        >
          {props.name}
      </span>
      <div className="container-product-counter">
        <button className="product-sub" data-testid={`customer_products__button-card-rm-item-${props.id}`}
          onClick={ quantity > 0 ? () => setQuantity(quantity - 1): ""}
        >-</button>
        <p className="product-quantity" data-testid={`customer_products__input-card-quantity-${props.id}`}>{quantity}</p>
        <button
          className={`customer_products__button-card-add-item-${props.id}`}
          onClick={ ()=> setQuantity(quantity + 1)}
          >+</button>
      </div>

    </div>
  );
}
