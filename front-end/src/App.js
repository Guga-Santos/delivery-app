import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductCard from './components/productCard';
import Home from './pages/home';
import Login from './pages/login';
import Products from './pages/products';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="customer/products" element={ <Products /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/" element={ <Home /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
