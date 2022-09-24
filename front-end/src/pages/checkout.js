import React from 'react';
import CheckoutList from '../components/checkoutList';
import CheckoutOrderSection from '../components/checkoutOrderSection';
import NavBar from '../components/navBar';

export default function Checkout() {
  return (
    <div className="checkout-container">
      <NavBar />
      <CheckoutList />
      <CheckoutOrderSection />
    </div>
  );
}
