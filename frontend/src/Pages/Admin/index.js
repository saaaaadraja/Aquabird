import React from 'react'
import {Routes, Route,BrowserRouter as Router , Navigate} from 'react-router-dom';
import Login from "./Login.js";
import axios from "axios";
import OrderList from './OrderList.js';
import HeaderAdmin from '../../component/HeaderAdmin.js';
import AddProducts from './AddProducts.js';
import Coupons from './Coupons.js';
import Subscriptions from './Subscriptions.js';
import Footer from '../../component/Footer.js';
import OrderDetails from './OrderDetails.js';
import NewProduct from './NewProduct.js';
import EditProduct from './EditProduct.js';
import AddCoupon from './Addcoupon.js';
import EditCoupon from './EditCoupon.js';
import LoadingSpinner from '../../component/LoadingSpinner.js';

const Index = ()=>{
    var [isAuth,setIsAuth] = React.useState(false);
    var [isLoading,setIsLoading] = React.useState(true);
  React.useEffect(()=>{
    axios.get('https://backend.aquabird.pk/protected',{withCredentials:true})
    .then((res)=>{
      if (res.status === 200) {
        setIsAuth(true);
        setIsLoading(false);
      }
    })
    .catch((err)=>{
      console.log(err);
      setIsLoading(false);
    })
  },[])
return(<>
{
  isLoading ? (<LoadingSpinner/>):(
<Router>
<header>
   <HeaderAdmin/>
   </header>
 <Routes>
 <Route exact path="/login" element={isAuth?<Navigate to="/order-list" replace />:<Login/>}/>
 <Route exact path="/admin" element={<Navigate to="/order-list" replace />}/>
 <Route exact path="/order-list" element={isAuth?<OrderList/>:<Login/>}/>
 <Route exact path="/order-list/:id" element={isAuth?<OrderDetails/>:<Login/>}/>
 <Route exact path="/add-products" element={isAuth?<AddProducts/>:<Login/>}/>
 <Route exact path="/coupons" element={isAuth?<Coupons/>:<Login/>}/>
 <Route exact path="/add-coupon" element={isAuth?<AddCoupon/>:<Login/>}/>
 <Route exact path="/edit-coupon/:id" element={isAuth?<EditCoupon/>:<Login/>}/>
 <Route exact path="/subscriptions" element={isAuth?<Subscriptions/>:<Login/>}/>
 <Route exact path="/new-product" element={isAuth?<NewProduct/>:<Login/>}/>
 <Route exact path="/edit-product/:id" element={isAuth?<EditProduct/>:<Login/>}/>
 </Routes>
 <footer>
  <Footer/>
 </footer>
 </Router>
  )}
</>)
}


export default Index;