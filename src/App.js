import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Layout from './Component/Layout';
import Cart from './Pages/Cart';
import Payment from './Pages/Payment';
import OrderDetails from './Pages/OrderDetails';
import Invoice from './Pages/Invoice';
import Offers from './Pages/Offers';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/payment" element={<Payment/>}></Route>
            <Route path="/orderdetails" element={<OrderDetails/>}></Route>
            <Route path="/invoice" element={<Invoice/>}></Route>
            <Route path="/offers" element={<Offers/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
