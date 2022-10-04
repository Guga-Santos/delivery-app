import React, { useEffect, useState } from 'react';
import NavBar from '../components/navBar';
import OrderCard from '../components/orderCard';
import { getOrdersByUserId } from '../service/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const { id } = JSON.parse(localStorage.getItem('user'));
      const result = await getOrdersByUserId(id);
      setOrders(result);
    };
    getOrders();
  }, []);

  return (
    <div>
      <NavBar />
      <main
        style={
          {
            width: '100vw',
            height: '93.8vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center' }
        }
      >
        {
          orders.map((order, index) => (
            <OrderCard
              key={ order.id }
              orderId={ order.id }
              id={ index + 1 }
              status={ order.status }
              saleDate={ order.saleDate }
              totalPrice={ order.totalPrice }
            />
          ))
        }
      </main>
    </div>
  );
}
