import React from "react";
import {Routes, Route,BrowserRouter as Router } from 'react-router-dom';
import Home from "./Pages/Home";
import About from "./Pages/About";
import Products from "./Pages/Products";
import Contact from "./Pages/Contact";
import Details from "./Pages/Details";
import Cart from "./Pages/Cart";
import whatsapp from './assets/images/whatssAppIcon.png'

import Header from "./component/Header";
import Footer from "./component/Footer";
import Checkout from "./Pages/Checkout";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Index from "./Pages/Admin/index";
import Subscription from "./Pages/Subscribtion";
import OrderCompletion from "./Pages/OrderCompelition";

const Routs = () =>{
  function socialTab(path) {
    window.open(path,'_blank')
  }
    return(
        <>
        
          {
    (window.location.href.split('/')[3] === 'admin' ||  window.location.href.split('/')[3] === 'login'
    ||  window.location.href.split('/')[3] === 'orderlist' ||  window.location.href.split('/')[3] === 'newproduct' || window.location.href.split('/')[3] === 'order-list'
    || window.location.href.split('/')[3] === 'add-products' || window.location.href.split('/')[3] === 'edit-product' || window.location.href.split('/')[3] === 'edit-coupon' ||
    window.location.href.split('/')[3] === 'new-product' || window.location.href.split('/')[3] === 'coupons' || window.location.href.split('/')[3] === 'add-coupon' || window.location.href.split('/')[3] === 'subscriptions')?(
          <Index/>
        ):(<>
          <Router>
              <header id='Header'>
              <Header/>
            </header>
              <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/about" element={<About/>}/>
              <Route exact path="/products" element={<Products/>}/>
              <Route exact path="/contact" element={<Contact/>}/>
              <Route exact path="/details/:id" element={<Details/>}/>
              <Route exact path="/my-cart" element={<Cart/>}/>
              <Route exact path="/checkout" element={<Checkout/>}/>
              <Route exact path="/subscribe/:id" element={<Subscription/>}/>
              <Route exact path="/privacy-policy" element={<PrivacyPolicy/>}/>
              <Route exact path="/order/:id" element={<OrderCompletion/>}/>
              </Routes>
              <footer>
                <Footer/>
              </footer>
              <div className="socialLinksFloating">
       <button className="w-100" onClick={()=>socialTab('https://api.whatsapp.com/send/?phone=%2B923100002198&text&type=phone_number&app_absent=0')}><img  className=" w-100 " src={whatsapp} alt=""/> </button> 
    </div>
              </Router>
              </>)
}
        
        </>
    )
}

export default Routs;