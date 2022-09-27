import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewUserProvider from './context/newUserProvider';
import AdminArea from './pages/admin';
import Checkout from './pages/checkout';
import Home from './pages/home';
import Login from './pages/login';
import Products from './pages/products';
import Register from './pages/register';
import Orders from './pages/orders';
import SellerOrderDetails from './pages/sellerOrderDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/seller/orders/:id" element={ <SellerOrderDetails /> } />
        <Route path="/customer/orders" element={ <Orders /> } />
        <Route path="customer/products" element={ <Products /> } />
        <Route path="customer/checkout" element={ <Checkout /> } />
        <Route path="/register" element={ <Register /> } />
        <Route
          path="/admin/manage"
          element={
            <NewUserProvider>
              <AdminArea />
            </NewUserProvider>
          }
        />
        <Route path="/login" element={ <Login /> } />
        <Route path="/" element={ <Home /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
