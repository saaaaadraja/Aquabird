import React from "react";
import {useNavigate} from 'react-router-dom';

const Cart = () =>{
  let [storageData,setStorageData] = React.useState([]);
  var [subTotal,setSubTotal ] = React.useState(0);
  var [total,setTotal] = React.useState(0);
 const Navigate = useNavigate();
    function gotoCheckOut() {
      if (storageData.length != 0) {
        Navigate('/checkout');
        localStorage.setItem('cartData',JSON.stringify([...storageData]));
         window.location.reload();
      }else{
        window.document.getElementById('cartTxt').style.fontWeight = 'bold'; 
    window.document.getElementById('cartTxt').innerHTML = "No item is present in cart."
    setTimeout(() => {
      window.document.getElementById('cartTxt').innerHTML = ""
    }, 2000);
      }
    }
function pluss(index,id) {
let val = storageData[index].quantity + 1;
storageData[index].quantity = val;
  let sub = val * (parseInt(storageData[index].price) + parseInt(storageData[index].SECURITY) + parseInt(storageData[index].refill) );
  storageData[index].subTotal = sub;

let ST = 0;
storageData.map((ele)=>{
  ST  = ST + parseInt(ele.subTotal);
  })
  setSubTotal(ST);
  setTotal(ST);
document.getElementById('d_quantity_'+id).innerHTML = storageData[index].quantity;
document.getElementById('d_subTotal_'+id).innerHTML = storageData[index].subTotal;
document.getElementById('d_subTotal').innerHTML = ST;
}
function sub(index,id) {
  if (storageData[index].quantity > 0) {
  let val = storageData[index].quantity - 1;
  storageData[index].quantity = val;
    let sub = val * (parseInt(storageData[index].price) + parseInt(storageData[index].SECURITY) + parseInt(storageData[index].refill) );
    storageData[index].subTotal = sub;
  let ST = 0;
storageData.map((ele)=>{
  ST  = ST + parseInt(ele.subTotal);
  })
  setSubTotal(ST);
  setTotal(ST);
  document.getElementById('d_quantity_'+id).innerHTML = storageData[index].quantity;
  document.getElementById('d_subTotal_'+id).innerHTML = storageData[index].subTotal;
  document.getElementById('d_subTotal').innerHTML = ST;
}
  }  
React.useEffect(()=>{
  let ST = 0;
  let returnData = localStorage.getItem("cartData");
 let retData = JSON.parse(returnData);
  setStorageData(retData);
  if (retData) {
  retData.map((ele)=>{
  ST  = ST + parseInt(ele.subTotal);
  })
  setSubTotal(ST);
  setTotal(ST);
}else{ 
  document.getElementById('proceedBtn').style.display = 'none';
  localStorage.setItem('shippingOption',JSON.stringify(''));
  setTotal(0);
}
},[])




function remove(id) {
  let remArr = storageData.filter(ele =>ele.id != id);
  localStorage.setItem('cartData',JSON.stringify([...remArr]));
  window.location.reload();
}
    return(
        <>
            <div className="page-head">
 <h2 className="text-center">My Cart</h2>   
 </div>
 <div>
 <div className="row w-85 mt-5 m-auto head-row">
<div className="col-2 order-head-txt">Product</div>
<div className="col-2"></div>
<div className="col-1 order-head-txt">Price</div>
<div className="col-1 order-head-txt">Security</div>
<div className="col-1 order-head-txt">Refill</div>
<div className="col-2 order-head-txt">Quantity</div>
<div className="col-2 order-head-txt">Subtotal</div>
<div className="col-1"></div>
 </div>
 {
 storageData ? storageData.map((d,i)=>{
   return <div className="row w-85 text-center mt-3 m-auto data-row" >
    <div className="col-2"><div className="w-50 item-img-div"><img className="w-100" src={d.icon} alt=""/></div></div>
    <div className="col-2 d-flex align-items-end"><p className="item-name">{d.name}</p></div>
    <div className="col-1 d-flex justify-content-center align-items-end"><p className="item-price">PKR {d.price}/-</p></div>
    <div className="col-1 d-flex justify-content-center align-items-end"><p className="item-price">PKR {d.SECURITY}/-</p></div>
    <div className="col-1 d-flex justify-content-center align-items-end"><p className="item-price">PKR {d.refill}/-</p></div>
    <div className="col-2 "> <div className="w-100 h-100 text-left px-0 quantity d-flex justify-content-center align-items-center mt-3" style={{color:'#1E1EC1'}}><span className="bg-white text-center w-40 detail-quantity-txt"  style={{border:'1px solid #D4D4D4'}}>
    <button className="d-inline minus-btn" onClick={()=>sub(i,d.id)}>-</button> 
    <p className="d-inline" id={`d_quantity_${d.id}`}>{d.quantity}</p> 
    <button className="d-inline pluss-btn" onClick={()=>pluss(i,d.id)}>+</button></span>
                         </div></div>
                         <div className="col-2 d-flex justify-content-center align-items-end"><p className="item-price">PKR <span id={`d_subTotal_${d.id}`}>{d.subTotal}</span>/-</p></div>
    <div  className="col-1 d-flex justify-content-center align-items-center"><button className="item-remove mt-4" onClick={()=>remove(d.id)} ><sub className="mt-3">*</sub><span style={{marginLeft:'0.5vw'}}>remove</span></button></div>
 </div>
  }):(<div className="text-center my-5 py-5" > There is no item added in cart...</div>)

}
 
 </div>
 <div>
    <div className="row w-70 mt-5 mb--10 m-auto">
      <div className="col-6"></div>
      <div className="col-6">
        <div className="w-70 m-auto total-card" >
            <div className="row w-90 m-auto subtotal-head-txt">
              <div className="col-6 text-left pl-0">
                Subtotal
              </div>
              <div className="col-6 text-right pr-0">
                PKR <span id="d_subTotal">{subTotal}</span>/-
              </div>
            </div>
            <p className=" mt-3 mb-0 shipping-head">Shipping</p>
<div className="pl-0 pb-1">
<div class="form-check pl-3 mb-0" >
 
</div>
<div class="form-check pl-3 mb-0">
  <input class="form-check-input shipping-radio-input" type="radio" checked name="exampleRadios" id="shippingOption2"  value="option2"/>
  <label class="form-check-label shipping-form-label" for="exampleRadios2">
  free shipping for Rawalpindi & Islamabad city
  </label>
</div>
<div class="form-check pl-3 mb-0" >
  
</div>
</div>
<div className="row w-90 m-auto total-head-txt">
              <div className="col-6 text-left pl-0">
                Total
              </div>
              <div className="col-6 text-right pr-0">
                PKR {total}/-
              </div>
</div>
<div className="text-center">
<p className='text-center alert-txt' style={{color:'red',marginBottom:'0',marginTop:'1rem'}} id='cartTxt'></p>
<button className="w-70 py-2 mt-3 m-auto proceed-to-checkout-btn" id="proceedBtn" onClick={gotoCheckOut}> <span >proceed to checkout</span></button>
</div>
       </div>
        </div>
      </div>
    </div>
 
        </>
    )
}


export default Cart;