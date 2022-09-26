import React, { useEffect, useState } from 'react';
import NavBar from '../components/navBar';
import { getOrdersByUserId } from '../service/api';
import OrderCard from '../components/orderCard';

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
      <main>
        {
          orders.map((order, index) => (
            <OrderCard
              key={ order.id }
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
