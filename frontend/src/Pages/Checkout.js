import React from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Checkout = ()=>{
  var navigate = useNavigate();
var [storageData,setStorageData] = React.useState([]);
var [subTotal,setSubTotal] = React.useState();
var [total,setTotal] = React.useState();
var [finalBill,setFinalBill] = React.useState();
var [payment,setPayment] = React.useState();
var [order,setOrder] = React.useState(
  {
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    zipCode: '',
    streetAddress: '',
    contactnumber: '',
    email: '',
    orderNotes: '',
    orderList: [],
    paymentMethod: '',
    discount:0
})

function handlePaymentMethod(val) {
  setPayment(val);
  setOrder({...order,paymentMethod:val});
}

  React.useEffect(()=>{
    let ST = 0;
    let returnData = localStorage.getItem("cartData");
    let retData = JSON.parse(returnData);
     setStorageData(retData);
     if (retData.length != 0) {
      retData.map((ele)=>{
      ST  = ST + parseInt(ele.subTotal);
      })
      setSubTotal(ST);
      setTotal(ST);
    }
    let personalInfoData = localStorage.getItem("personalInfo");
    let personalInfo = JSON.parse([personalInfoData]);
    if (personalInfo && personalInfo.length != 0) {
      setOrder({...order, firstName:personalInfo[0].firstName,lastName:personalInfo[0].lastName, orderNotes:personalInfo[0].message})
    }
  },[])

  function placeOrder() {
   
    document.getElementById('checkoutBtn').disabled = true;
    storageData.map((ele)=>{
      order.orderList.push(ele);
    })
    if (order.firstName && order.lastName && order.city && order.contactnumber && order.country && order.email && order.zipCode && order.streetAddress && order.orderList.length != 0 ) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(order.email)){
      
          let orderData = {...order,orderList:JSON.stringify(order.orderList)}
          axios.post('https://backend.aquabird.pk/postData',orderData)
          .then((res)=>{
            localStorage.setItem('cartData',JSON.stringify([]));
            localStorage.setItem('personalInfo',JSON.stringify([]));
            window.document.getElementById('checkoutTxt').style.color = 'green'; 
            window.document.getElementById('checkoutTxt').style.fontWeight = 'bold'; 
        document.getElementById('checkoutTxt').innerText = 'successfully submitted';
        document.getElementById('checkoutBtn').disabled = false;
        document.getElementById('checkoutBtn').disabled = false;
            navigate('/order/'+res.data);
            window.location.reload();
          }
            )
            .catch((err)=>console.log(err))
      }else{
        window.document.getElementById('checkoutTxt').style.color = 'red'; 
        window.document.getElementById('checkoutTxt').style.fontWeight = 'bold'; 
        document.getElementById('checkoutTxt').innerText = 'Kindly enter a valid email address';
        document.getElementById('checkoutBtn').disabled = false;
        setTimeout(() => {
          document.getElementById('checkoutTxt').innerText = '';
        }, 2500);
      }
    }else{
      window.document.getElementById('checkoutTxt').style.color = 'red'; 
      window.document.getElementById('checkoutTxt').style.fontWeight = 'bold'; 
      document.getElementById('checkoutTxt').innerText = 'Kindly fill the form properly';
      document.getElementById('checkoutBtn').disabled = false;
      setTimeout(() => {
        document.getElementById('checkoutTxt').innerText = '';
      }, 2500);
    }
  }
  const [couponCode,setCouponCode] = React.useState('');
function couponApply(e) {
  if (couponCode) {
    axios.get('https://backend.aquabird.pk/get-coupons')
    .then((res)=>{
      if (res.data.length !=0) {
        const val =  res.data.filter((ele)=>{
          if (ele.couponCode.toUpperCase() == couponCode.toUpperCase()) {
            let result = ele.couponCode;
            return result;
          }
        });
       if (val.length == 0 || val[0].status=='disable') {
        window.document.getElementById('couponValidTxt').style.color = 'red'; 
        window.document.getElementById('couponValidTxt').style.fontWeight = 'bold'; 
        document.getElementById('couponValidTxt').innerText = 'Invalid Coupon Code';
        setTimeout(() => {
          document.getElementById('couponValidTxt').innerText = '';
        }, 2500);
       }else if (val[0].status=='enable') {
        const txt = val[0].couponCode;
        let num = txt.replace(/[^0-9]/g, ''); 
        let offPer = parseInt(num,10);
        window.document.getElementById('couponValidTxt').style.color = 'green'; 
        window.document.getElementById('couponValidTxt').style.fontWeight = 'bold'; 
        document.getElementById('couponValidTxt').innerText = `you have got ${offPer}% descount`;
        setTimeout(() => {
          document.getElementById('couponValidTxt').innerText = '';
        }, 2500);
        let dis = (offPer/100)*total;
        setOrder({...order,discount:dis});
        setFinalBill(total-dis);
       }
      }
    })
    .catch((err)=>console.log(err))
  }else{
    window.document.getElementById('couponValidTxt').style.color = 'red'; 
    window.document.getElementById('couponValidTxt').style.fontWeight = 'bold'; 
    document.getElementById('couponValidTxt').innerText = 'kindly enter the coupon code';
    setTimeout(() => {
      document.getElementById('couponValidTxt').innerText = '';
    }, 2500);
  }
}

    return(<>
         <div className="page-head">
 <h2 className="text-center">Checkout</h2>   
 </div>
 <p className='text-center alert-txt mb-3' style={{color:'red',marginBottom:'0',marginTop:'1rem'}} id='couponValidTxt'></p>
 <div className="subscribe-email w-75 mt-5 m-auto" ><input type="text" className="email-input-field w-90" name="couponCode" value={couponCode} onChange={e=>setCouponCode(e.target.value)} placeholder="Enter Coupon Code"/><button className="sub-btn pr-2 pl-2 w-10" onClick={couponApply}>Apply</button></div>
    <div className="w-75 mt-5 mb--10 m-auto">
        <div className="row checkout-outer-row">
        <div className="col-7 checkout-left-col">
    <div className="row">
        <h5 className="clr-head">Billing Details</h5>
  <div className="col-6 text-left ">
    <label className="checkout-field-label" for="firstName">First Name <span className="important-star">*</span></label>
    <input type="text" className="checkout-input-field w-90"  value={order.firstName}  onChange={(e)=>setOrder({...order,firstName:e.target.value})} name="firstName" />
    </div>
  <div className="col-6 text-left ">
  <label className="checkout-field-label" for="lastName">Last Name <span className="important-star">*</span></label>
    <input type="text" className="checkout-input-field w-90" value={order.lastName}  onChange={(e)=>setOrder({...order,lastName:e.target.value})} name="lastName"/>
    </div>
  <div className="col-12 text-left ">
  <label className="checkout-field-label" for="countryName">country / Region <span className="important-star">*</span></label>
    <input type="text" className="checkout-input-field w-95" value={order.country}  onChange={(e)=>setOrder({...order,country:e.target.value})} name="countryName" />
    </div>
    <div className="col-12 text-left ">
  <label className="checkout-field-label" for="city">city <span className="important-star">*</span></label>
    <input type="text" className="checkout-input-field w-95" value={order.city}  onChange={(e)=>setOrder({...order,city:e.target.value})} name="city" />
    </div>
    <div className="col-12 text-left ">
  <label className="checkout-field-label" for="zipCode">Zip Code <span className="important-star">*</span></label>
    <input type="text" className="checkout-input-field w-95" value={order.zipCode}  onChange={(e)=>setOrder({...order,zipCode:e.target.value})} name="zipCode" />
    </div>
    <div className="col-12 text-left ">
  <label className="checkout-field-label" for="street">Street Address <span className="important-star">*</span></label>
    <input type="text" className="checkout-input-field w-95" value={order.streetAddress}  onChange={(e)=>setOrder({...order,streetAddress:e.target.value})} name="street" />
    </div>
    <div className="col-12 text-left ">
  <label className="checkout-field-label" for="contactNumber">Contact Number<span className="important-star">*</span></label>
   <PhoneInput  country={'pk'} inputProps={{
    name: 'phone',
    required: true,
  }}
  isValid={(value, country) => {
    if (value.match(/12345/)) {
      return 'Invalid phone number: '+value+', '+country.name;
    } else if (value.match(/1234/)) {
      return false;
    } else if (value.length > 2 && value.length < 12 ) {
      return 'Invalid value: '+value;
    }else {
      return true;
    }
  }}
  value={order.contactnumber} onChange={(phone)=>setOrder({...order,contactnumber:phone})}/>
    </div>
    <div className="col-12 text-left ">
  <label className="checkout-field-label" for="email">Email<span className="important-star">*</span></label>
    <input type="email" className="checkout-input-field w-95" value={order.email} onChange={(e)=>setOrder({...order,email:e.target.value})} name="email" />
    </div>
    <div className="col-12 text-left ">
  <label className="checkout-field-label" for="notes">Order Notes (optional)</label>
    <textarea rows="7" cols="5" type="text" className="checkout-input-field w-95" value={order.orderNotes} onChange={(e)=>setOrder({...order,orderNotes:e.target.value})} name="notes" />
    </div>
  </div>
        </div>
        <div className="col-5 checkout-right-col">
        <h5 className="clr-head w-90 m-auto">Your Order</h5>
        <div className="row w-90 mt-2 m-auto row-b-b">
          <div className="col-6 tabl-head text-left pl-0">Products</div>
          <div className="col-6 tabl-head text-right pr-0">Subtotal</div>
        </div>
        {
          storageData && storageData.map((d,i)=>{
         return(<>
          <div className="row w-90 mt-2 m-auto row-b-b">
          <div className="col-6 tabl-body text-left pl-0">{d.name}</div>
          <div className="col-6 tabl-body text-right pr-0">PKR {d.subTotal}/-</div>
          </div>  
         </>)
          })
 
        }
      
        <div className="row w-90 mt-2 m-auto row-b-b">
          <div className="col-6 tabl-head text-left pl-0">Subtotal</div>
          <div className="col-6 tabl-head text-right pr-0">PKR {subTotal}/-</div>
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
  <input class="form-check-input shipping-radio-input" type="radio" name="exampleRadios1" checked={true } id="paymentOption1" value="option1" />
  <label class="form-check-label shipping-form-label" for="exampleRadios1">
  Cash on delivery (no delivery charges)
  </label>
</div>

</div>
</div>
<div className="row w-90 mt-2 m-auto row-b-b">
          <div className="col-6 tabl-head text-left pl-0">Total:</div>
          <div className="col-6 tabl-head text-right pr-0">PKR {total}/-</div>
          <div className="col-6 tabl-head text-left pl-0">Discount:</div>
          <div className="col-6 tabl-head text-right pr-0">PKR {order.discount}/-</div>
          <div className="col-6 tabl-head text-left pl-0">Final Bill:</div>
          <div className="col-6 tabl-head text-right pr-0">PKR {finalBill?finalBill:total}/-</div>
        </div>
<div className="w-90 mt-3  m-auto">
<p className='text-center alert-txt mb-3' style={{color:'red',marginBottom:'0',marginTop:'1rem'}} id='checkoutTxt'></p>
<button className=" py-2 w-100  proceed-to-checkout-btn" id="checkoutBtn" onClick={placeOrder}> <span >Place Order</span></button>
</div>
        </div>
        </div>
    </div>
    </>)
}


export default Checkout;