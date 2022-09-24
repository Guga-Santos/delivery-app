import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewUserProvider from './context/newUserProvider';
import AdminArea from './pages/admin';
import Home from './pages/home';
import Login from './pages/login';
import Products from './pages/products';
import Register from './pages/register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="customer/products" element={ <Products /> } />
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
