import React, { useEffect, useState } from 'react';
import NavBar from '../components/navBar';
import SaleCard from '../components/saleCard';
import { getSalesBySellerId } from '../service/api';

const moment = require('moment');

export default function Seller() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem('user'));
    async function sellerAllSales(userId) {
      setSales(await getSalesBySellerId(userId));
    }
    sellerAllSales(id);
  }, []);

  console.log(sales);
  return (
    <div>
      <NavBar />
      {
        sales?.map((sale, index) => (
          <SaleCard
            key={ index }
            id={ sale.id }
            status={ sale.status }
            date={ moment(sale.saleDate).locale('pt-br').format('DD/MM/YYYY') }
            totalPrice={ sale.totalPrice.replace('.', ',') }
            address={ `${sale.deliveryAddress} ${sale.deliveryNumber}` }
          />
        ))
      }
    </div>
  );
}
