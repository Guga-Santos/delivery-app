import React, { useEffect, useState } from 'react';
import { usersRequest } from '../service/api';

export default function CheckoutOrderSection() {
  const [sellers, setSellers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const { data } = await usersRequest('/users');
      setSellers(data.filter((user) => user.role === 'seller'));
    };
    getUsers();
  }, []);

  return (
    <div className="order-section-container">
      <section>
        <label htmlFor="select-seller">
          <p>P. Vendedora Responsável</p>
          <select
            name="select-seller"
            id="select-seller"
            data-testid="customer_checkout__select-seller"
          >

            { sellers && sellers.map((seller) => (
              <option
                value="seller"
                key={ seller.id }
              >
                { seller.name }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="input-address">
          <p>Endereço</p>
          <input
            type="text"
            name="input-address"
            id="input-address"
            data-testid="customer_checkout__input-address"
          />
        </label>
        <label htmlFor="input-address-number">
          <p>Número</p>
          <input
            type="text"
            name="input-address-number"
            id="input-address-number"
            data-testid="customer_checkout__input-address-number"
          />
        </label>
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Pedido

        </button>
      </section>
    </div>
  );
}
