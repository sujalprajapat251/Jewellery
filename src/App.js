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
import About from './Pages/About';
import Contact from './Pages/Contact';
import Faq from './Pages/Faq';
import TermsCondition from './Pages/TermsCondition';
import Privacy from './Pages/Privacy';
import MyProfile from './Pages/MyProfile';
import Wishlist from './Pages/Wishlist';
import ProductList from './Pages/ProductList';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/wishlist" element={<Wishlist/>}></Route>
            <Route path="/productlist" element={<ProductList/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/payment" element={<Payment/>}></Route>
            <Route path="/orderdetails" element={<OrderDetails/>}></Route>
            <Route path="/invoice" element={<Invoice/>}></Route>
            <Route path="/offers" element={<Offers/>}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/faq" element={<Faq/>}></Route>
            <Route path="/terms" element={<TermsCondition/>}></Route>
            <Route path="/privacy" element={<Privacy/>}></Route>
            <Route path="/myprofile" element={<MyProfile/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
