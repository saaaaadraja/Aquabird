import React from 'react'
import axios from 'axios';
import LoadingSpinner from '../../component/LoadingSpinner';

import { useNavigate } from 'react-router-dom';
const OrderList = () =>{
    const [isLoading,setIsLodaing] = React.useState(true);
    const [order,setOrder] = React.useState({});
    const [orderDetails,setOrderDetails] = React.useState([]);
    const [finalBill,setFinalBill] = React.useState();

    let navigate = useNavigate();


    React.useEffect(()=>{
      setTimeout(()=>{
        setIsLodaing(false);
      },500)
        axios.get('https://backend.aquabird.pk/getData')
        .then((res)=>{
         let data =   res.data.filter((ele)=>ele.id ==  window.location.href.split('/')[4]);
         let sum = 0;
         JSON.parse(data[0].order) && JSON.parse(data[0].order).map((d)=>{
         sum = sum + d.subTotal;
     })
     data[0] ={...data[0],subTotal:sum}
 
  data[0] ={...data[0],total:sum}
  sum = sum - data[0].discount;
     setFinalBill(sum)
           setOrder(data[0]);
           data[0].order && JSON.parse(data[0].order).map((d)=>setOrderDetails([...orderDetails,d]));
        })
        .catch((err)=>console.log(err))
    },[])


    function updateOrder() {
      axios.post('https://backend.aquabird.pk/update-order',order)
      .then((res)=>{
        if (res.data == true) {
       navigate('/order-list');
       window.location.reload();
    }else{
     document.getElementById('orderUpdateTxt').innerText = 'not sucessfully updated...';
     setTimeout(() => {
      document.getElementById('orderUpdateTxt').innerText = '';
     }, 1000);
    }
   
      })
      .catch((err)=>console.log(err))
    }
    return(<>
    {
        isLoading?(<LoadingSpinner/>):(<>
     <div className="page-head">
 <h2 className="text-center">order detail</h2>   
 </div>
    <div className="w-75 mt-5 mb--10 m-auto">
        <div className="row checkout-outer-row">
        <div className="col-7 checkout-left-col">
    <div className="row">
        <h5 className="clr-head">Billing Details</h5>
  <div className="col-6 text-left ">
    <label className="checkout-field-label" for="firstName">First Name <span className="important-star">*</span></label>
    <input  type="text" className="checkout-input-field w-90"  value={order.firstName}  onChange={(e)=>setOrder({...order,firstName:e.target.value})} name="firstName" />
    </div>
  <div className="col-6 text-left ">
  <label className="checkout-field-label" for="lastName">Last Name <span className="important-star">*</span></label>
    <input  type="text" className="checkout-input-field w-90" value={order.lastName}  onChange={(e)=>setOrder({...order,lastName:e.target.value})} name="lastName"/>
    </div>
  <div className="col-12 text-left ">
  <label className="checkout-field-label" for="countryName">country / Region <span className="important-star">*</span></label>
    <input  type="text" className="checkout-input-field w-95" value={order.country}  onChange={(e)=>setOrder({...order,country:e.target.value})} name="countryName" />
    </div>
    <div className="col-12 text-left ">
  <label className="checkout-field-label" for="city">city <span className="important-star">*</span></label>
    <input  type="text" className="checkout-input-field w-95" value={order.city}  onChange={(e)=>setOrder({...order,city:e.target.value})} name="city" />
    </div>
    <div className="col-12 text-left ">
  <label className="checkout-field-label" for="zipCode">Zip Code <span className="important-star">*</span></label>
    <input  type="text" className="checkout-input-field w-95" value={order.zipCode}  onChange={(e)=>setOrder({...order,zipCode:e.target.value})} name="zipCode" />
    </div>
    <div className="col-12 text-left ">
  <label className="checkout-field-label" for="street">Street Address <span className="important-star">*</span></label>
    <input  type="text" className="checkout-input-field w-95" value={order.streetAddress}  onChange={(e)=>setOrder({...order,streetAddress:e.target.value})} name="street" />
    </div>
    <div className="col-12 text-left ">
  <label className="checkout-field-label" for="contactNumber">Contact Number<span className="important-star">*</span></label>
  <input  type="text" className="checkout-input-field w-95" value={'+'+ order.contactnumber}  onChange={(e)=>setOrder({...order,contactnumber:e.target.value})} name="street" />
    </div>
    <div className="col-12 text-left ">
  <label className="checkout-field-label" for="email">Email<span className="important-star">*</span></label>
    <input  type="email" className="checkout-input-field w-95" value={order.email} onChange={(e)=>setOrder({...order,email:e.target.value})} name="email" />
    </div>
    <div className="col-12 text-left ">
  <label className="checkout-field-label" for="notes">Order Notes (optional)</label>
    <textarea  rows="7" cols="5" type="text" className="checkout-input-field w-95"value={order.orderNotes} onChange={(e)=>setOrder({...order,orderNotes:e.target.value})} name="notes" />
    </div>
  </div>
        </div>
        <div className="col-5 checkout-right-col">
        <h5 className="clr-head w-90 m-auto">Your Order</h5>
        <div className="row w-90 mt-2 m-auto row-b-b">
          <div className="col-3 tabl-head text-left pl-0">Products</div>
          <div className="col-3 tabl-head text-center pl-0">Quantity</div>
          <div className="col-3 tabl-head text-center pl-0">price</div>
          <div className="col-3 tabl-head text-right pr-0">Subtotal</div>
        </div>
       {
        order && order.order && JSON.parse(order.order).map((d)=>{
         return(<>
          <div className="row w-90 mt-2 m-auto row-b-b">
          <div className="col-3 tabl-body text-left pl-0">{d.name}</div>
          <div className="col-3 tabl-body text-center pl-0">{d.quantity}</div>
          <div className="col-3 tabl-body text-center pl-0">{d.price}</div>
          <div className="col-3 tabl-body text-right pr-0">PKR {d.subTotal}/-</div>
          </div>  
         </>)
          })
 
        } 
      
        <div className="row w-90 mt-2 m-auto row-b-b">
          <div className="col-6 tabl-head text-left pl-0">Subtotal</div>
          <div className="col-6 tabl-head text-right pr-0">PKR {order.subTotal}/-</div>
        </div>
        <div className="w-90  m-auto row-b-b">
<p className=" mt-3 mb-0 shipping-head">Shipping</p>
<div className="pl-0 pb-1">
<div class="form-check pl-3 mb-0" ></div>
<div class="form-check pl-3 mb-0">
  <input class="form-check-input shipping-radio-input" type="radio" name="exampleRadios" checked id="shippingOption2" value="option2"/>
  <label class="form-check-label shipping-form-label" for="exampleRadios2">
  free shipping for Rawalpindi & Islamabad city
  </label>
</div>
<div class="form-check pl-3 mb-0" ></div>
</div>
</div>
<div className="w-90  m-auto row-b-b">
<p className=" mt-3 mb-0 shipping-head">Payment Method</p>
<div className="pl-0 pb-1">
<div class="form-check pl-3 mb-0" >
  <input class="form-check-input shipping-radio-input" type="radio"  name="exampleRadios1" checked={true} id="paymentOption1" value="option1" />
  <label class="form-check-label shipping-form-label" for="exampleRadios1">
  Cash on delivery (no delivery charges)
  </label>
</div>
</div>
</div>
<div className="row w-90 mt-2 m-auto row-b-b">
<div className="col-6 tabl-head text-left pl-0">Total:</div>
          <div className="col-6 tabl-head text-right pr-0">PKR {order.total}/-</div>
          <div className="col-6 tabl-head text-left pl-0">Discount:</div>
          <div className="col-6 tabl-head text-right pr-0">PKR {order.discount}/-</div>
          <div className="col-6 tabl-head text-left pl-0">Final Bill:</div>
          <div className="col-6 tabl-head text-right pr-0">PKR {finalBill}/-</div>
        </div>
<div className="w-90 mt-3  m-auto">
<p className='text-center alert-txt mb-3' style={{color:'red',marginBottom:'0',marginTop:'1rem'}} id='orderUpdateTxt'></p>
<button className=" py-2 w-100  proceed-to-checkout-btn" onClick={updateOrder}> <span >update Order</span></button>
</div>
        </div>
        </div>
    </div>
    </>)}
    </>)
}


export default OrderList;

