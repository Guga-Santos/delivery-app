import React, { useEffect, useState } from 'react';
import SaleCard from '../components/saleCard';
import SellerHeader from '../components/sellerHeader';
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
      <SellerHeader />
      <div
        style={
          {
            width: '100vw',
            padding: '5vh 15vw' }
        }
      >
        {
          sales?.map((sale, index) => (
            <SaleCard
              key={ index }
              id={ sale.id }
              status={ sale.status }
              date={ moment(sale.saleDate).locale('pt-br').format('DD/MM/YYYY') }
              totalPrice={ sale.totalPrice.replace('.', ',') }
              address={ `${sale.deliveryAddress}, nº ${sale.deliveryNumber}` }
            />
          ))
        }
      </div>
    </div>
  );
}
