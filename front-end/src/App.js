import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminArea from './pages/admin';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Costumer from './pages/costumer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={ <Register /> } />
        <Route path="/admin/manage" element={ <AdminArea /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/" element={ <Home /> } />
        <Route path="/customer/checkout" element={ <Costumer /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
