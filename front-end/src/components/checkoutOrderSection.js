import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewCartContext from '../context/newCartContext';
import { createSale, createSaleProducts, usersRequest } from '../service/api';

const moment = require('moment');

export default function CheckoutOrderSection() {
  const [sellers, setSellers] = useState([]);
  const [sellerId, setSeller] = useState('');
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const { cart } = useContext(NewCartContext);

  const navigate = useNavigate();
  const newdate = moment(new Date()).locale('pt-br').format('DD/MM/YYYY');

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await usersRequest('/users');
      setSellers(data.filter((user) => user.role === 'seller'));
    };
    getUsers();
  }, []);

  const handleClick = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const sale = await createSale(
      {
        userId: user.id,
        sellerId,
        totalPrice: cart.map((obj) => obj.price)
          .reduce((a, b) => a + b, 0)
          .toFixed(2),
        deliveryAddress: address,
        deliveryNumber: addressNumber,
        saleDate: moment(new Date()) },
      user.token,
    );
    console.log(newdate);
    await createSaleProducts({ saleId: sale.id, data: cart }, user.token);
    // localStorage.removeItem('cart');
    localStorage.setItem('sellerInfo', JSON.stringify(sellers[0]));
    navigate(`../customer/orders/${sale.id}`);
  };

  return (
    <div
      className="order-section-container"
      style={
        {
          width: '100vw',
          display: 'flex',
          justifyContent: 'center' }
      }
    >
      <section
        style={
          {
            width: '30vw',
            height: '30vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#036b52',
            color: 'white' }
        }
      >
        <label htmlFor="select-seller">
          <p>P. Vendedora Responsável</p>
          <select
            name="select-seller"
            id="select-seller"
            style={
              {
                width: '25.3vw',
                height: '3vh',
                fontSize: '1.8vh',
                marginBottom: '1vh' }
            }
            data-testid="customer_checkout__select-seller"
            onChange={ ({ target }) => setSeller(target.value) }
            value={ sellerId }
          >
            <option value="">Selecione</option>
            { sellers && sellers.map((sel) => (
              <option
                value={ sel.id }
                key={ sel.id }
              >
                { sel.name }
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
            style={
              {
                width: '25vw',
                height: '3vh',
                fontSize: '1.8vh',
                marginBottom: '1vh',
                paddingLeft: '.1vw' }
            }
            data-testid="customer_checkout__input-address"
            onChange={ ({ target }) => setAddress(target.value) }
            value={ address }
          />
        </label>
        <label htmlFor="input-address-number">
          <p>Número</p>
          <input
            type="text"
            name="input-address-number"
            id="input-address-number"
            style={
              {
                width: '25vw',
                height: '3vh',
                fontSize: '1.8vh',
                marginBottom: '1vh',
                paddingLeft: '.1vw' }
            }
            data-testid="customer_checkout__input-address-number"
            onChange={ ({ target }) => setAddressNumber(target.value) }
            value={ addressNumber }
          />
        </label>
        <button
          type="button"
          style={
            {
              width: '10vw',
              height: '4vh',
              fontSize: '1.8vh',
              marginBottom: '1vh',
              cursor: 'pointer' }
          }
          data-testid="customer_checkout__button-submit-order"
          onClick={ handleClick }
        >
          Finalizar Pedido

        </button>
      </section>
    </div>
  );
}
