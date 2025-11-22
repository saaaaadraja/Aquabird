import React from "react";
import waterDrop from '../assets/images/Water drop.png'
import glass from '../assets/images/Glass.png'
import circle from '../assets/images/5.png'
import banner1 from '../assets/images/Banner1.png'
import hand from '../assets/images/Hand.png'
import minerals from '../assets/images/Bottle_Minerals.png'
import Slider from "../component/Slider";
import ClientSlider from "../component/ClientSlider";


import { useLinkClickHandler, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () =>{

const [data, setData] = React.useState();
const [price, setPrice] = React.useState(0);
const [finalPrice, setFinalPrice] = React.useState(0);
const [personalInfo, setPersonalInfo] = React.useState({
  firstName:'',lastName:'',message:''
})
const [orderElement, setOrderElement] = React.useState();
const [quantity, setQuantity] = React.useState('--');
  var navigate = useNavigate();
  function gotoProducts(path) {
    navigate(path);
    window.location.reload()
  }

 React.useEffect(()=>{
  axios.get('https://backend.aquabird.pk/products')
  .then((res)=>{
 setData(res.data);
 })
 .catch((err)=>console.log(err))

 },[])

 function handleRadioOnclick(id) {
  let ele = data.filter((d)=>d.id === id);
setPrice(parseInt(ele[0].price) + parseInt(ele[0].SECURITY) + parseInt(ele[0].refill));
setFinalPrice(parseInt(ele[0].price) + parseInt(ele[0].SECURITY) + parseInt(ele[0].refill));
setQuantity(1);
setOrderElement(ele[0]);
 }
 function pluss(e) {
  e.preventDefault();
  if (price == 0) {
    window.document.getElementById('ordrTxt').style.color = 'red'; 
    window.document.getElementById('ordrTxt').style.fontWeight = 'bold'; 
    window.document.getElementById('ordrTxt').innerHTML= 'Kindly select a product first'
    setTimeout(() => {
      window.document.getElementById('ordrTxt').innerHTML= ''
    }, 1500);
  }else{
    setQuantity(quantity + 1);
    let value = quantity + 1;
    setFinalPrice(value * price);
  }
  }
  function sub(e) {
    e.preventDefault();
    if (price == 0) {
      window.document.getElementById('ordrTxt').style.color = 'red'; 
      window.document.getElementById('ordrTxt').style.fontWeight = 'bold'; 
      window.document.getElementById('ordrTxt').innerHTML= 'Kindly select a product first'
      setTimeout(() => {
        window.document.getElementById('ordrTxt').innerHTML= ''
      }, 1500);
    }else{ 
      if (quantity > 1) {
        setQuantity(quantity - 1);
        let value = quantity - 1;
        setFinalPrice(value * price);
    }
    }
    } 


    function clickHandler(e) {
      e.preventDefault();
      if (price == 0) {
        window.document.getElementById('ordrTxt').style.color = 'red'; 
        window.document.getElementById('ordrTxt').style.fontWeight = 'bold'; 
        window.document.getElementById('ordrBtnTxt').innerHTML= 'Kindly select a product first'
        setTimeout(() => {
          window.document.getElementById('ordrBtnTxt').innerHTML= ''
        }, 1500);
      }else{
          let retString = localStorage.getItem("cartData");
          let retArray = [];
          if (retString != null) {
            retArray = JSON.parse(retString);
          }
        orderElement.disable = 'true';
        orderElement.quantity = quantity;
        orderElement.subTotal = finalPrice;
        navigate('/checkout');
        localStorage.setItem('cartData',JSON.stringify([...retArray,orderElement]));
        localStorage.setItem('personalInfo',JSON.stringify([personalInfo]));
         window.location.reload();
      }
    }
return (
    <>
    {/* <div className="image-top" style={{display:'none'}}><img className="w-100" src={banner1} alt="" /></div> */}
  <div className="w-100 home-intro">
  <div className="w-75 m-auto text-center intro-txt">
    <h3 className="text-primary">Aquabird<br/>
“Excellence in quantity and Purity”</h3>
<p>At Aquabird, we are dedicated to providing you with the highest quantity drinking water that undergoes a rigorous purification process 
    using reverse osmosis technology. Our goal is to deliver pure, refreshing water that is free from impurities 
    while retaining essential minerals for your health and well-being.</p>
    <button className="order-btn" onClick={()=>gotoProducts('/products')}>order now</button>
    </div>
  </div>
  <div className="quantity-card w-50 m-auto text-center py-3">
<h5>A Trusted Name in<br/>
Mineral Water Industry</h5>
<div className="card-grid w-100 mx-auto mt-4">
    <div className="text-center">
        <img className="w-25" src={waterDrop} alt=""/>
        <h6 className="card-sub-heading">Maximum Purity</h6>
        <p className="card-txt">Delivering the highest level of purity and quantity in every bottle of water we provide.</p>
    </div>
    <div className="text-center">
        <img className="w-25" src={hand} alt=""/>
        <h6 className="card-sub-heading">Chlorine Free</h6>
        <p className="card-txt">Offering mineral water that retains its natural essence while ensuring the absence of chlorine.</p>
    </div>
    <div className="text-center">
        <img className="w-25" src={circle} alt=""/>
        <h6 className="card-sub-heading">Reverse Osmosis water</h6>
        <p className="card-txt">Sophisticated water purification process.</p>
    </div>
    <div className="text-center">
        <img className="w-25" src={glass} alt=""/>
        <h6 className="card-sub-heading">Healthy water</h6>
        <p className="card-txt">Promotes your overall health and well-being.</p>
    </div>
</div>
  </div>
  <div className="products-sect text-center" style={{padding:'6vw 0'}}>
<h2 className="sect-head">Our Products</h2>
<p className="para-prod w-50 m-auto">Our flagship product, Reverse Osmosis Mineral Water, is the epitome of purity and quantity. This water undergoes the advanced reverse osmosis purification
     process and subsequent mineralization, ensuring that you receive water that is both clean and replenishing. </p>
    <Slider/>
  </div>
  <div className="mineral-compo text-center">
  <h2 className="sect-head">Mineral Composition</h2>
<p className="para-prod w-50 m-auto">The mineral composition of Aquabird reverse osmosis mineral water is highly effective at removing 
impurities and contaminants from water, it also eliminates some naturally occurring minerals.</p>
<div className="minral-detail w-75 m-auto mt-5">
  <div className="text-left mt-5">
    <div>
  <h4 className="mineral-heading">Calcium+</h4>
  <p className="sub-heading">5-12 mg/dm<sup>3</sup></p>
  <p className="mineral-detail">Essential for bone health, muscle function,<br/> and nerve transmission.</p>
  </div>
  <div className="mt-4">
  <h4 className="mineral-heading">Magnesium</h4>
  <p className="sub-heading">2-5 mg/dm<sup>3</sup></p>
  <p className="mineral-detail">Supports various bodily functions, including muscle and nerve function, energy production, and bone health.</p>
  </div>
  <div className="mt-4">
  <h4 className="mineral-heading">Sodium</h4>
  <p className="sub-heading">20-25 mg/dm<sup>3</sup></p>
  <p className="mineral-detail"> Maintains fluid balance and proper nerve and muscle function.</p>
  </div>
  </div>
  <div><img className="w-100" src={minerals} alt=""/></div>
  <div className="text-right mt-5 right-text">
    <div>
  <h4 className="mineral-heading">Potassium</h4>
  <p className="sub-heading">~46 mg/dm<sup>3</sup></p>
  <p className="mineral-detail">Plays a role in maintaining proper fluid balance, nerve function, and muscle contractions.</p>
  </div>
  <div className="mt-4">
  <h4 className="mineral-heading">Bicarbonates</h4>
  <p className="sub-heading">6,8 - 7,3</p>
  <p className="mineral-detail">Help regulate pH balance in the body and support digestion</p>
  </div>
  <div className="mt-4">
  <h4 className="mineral-heading">Trace Minerals</h4>
  <p className="sub-heading">90-140 mg/dm<sup>3</sup></p>
  <p className="mineral-detail">These include minerals like zinc, selenium, copper, manganese, and others that are required in smaller amounts but still play important roles in various bodily functions.</p>
  </div>
  </div>
</div>
  </div>
  <div className="order-sect">
    <div></div>
    <div className="order-bottle-sect w-75 m-auto">
      <h3 className="text-primary text-center">Order The Bottle</h3>
      <form>
        <div className="d-flex flex-row gap-4 justify-content-start">
          {
           data && data.map((d)=>{
              return(<>
    <div class="form-check" key={d.id}  >
  <input class="form-check-input" type="radio" name="exampleRadios" onClick={()=>handleRadioOnclick(d.id)}  value="option2"/>
  <label class="form-check-label" for="exampleRadios2">
   {d.name}
  </label>
</div>
              </>)
            })

}
</div>
<div className="row">
<p className='text-left alert-txt ' style={{color:'red',marginBottom:'0',marginTop:'1rem'}} id='ordrTxt'></p>
  <div className="col-6 text-center mt-3">Quantity: <span className="bg-white quantity-txt">
    <button className="d-inline minus-btn" onClick={sub}>-</button> 
    <p className="d-inline">{quantity}</p> 
    <button className="d-inline pluss-btn" onClick={pluss}>+</button></span>
    </div>
  <div className="col-6 text-center text-primary mt-3"> Total Price: PKR {finalPrice}/-</div>
  <div className="col-6 text-left mt-3"><input type="text" value={personalInfo.firstName} className="input-field w-90" onChange={(e)=>setPersonalInfo({...personalInfo, firstName:e.target.value})} name="firstName" placeholder="First Name"/></div>
  <div className="col-6 text-left mt-3"><input type="text" value={personalInfo.lastName} className="input-field w-90" onChange={(e)=>setPersonalInfo({...personalInfo, lastName:e.target.value})} name="lastName" placeholder="Last Name"/></div>
  <div className="col-12 text-left mt-3"><input type="text" value={personalInfo.message} className="input-field w-95" onChange={(e)=>setPersonalInfo({...personalInfo, message:e.target.value})} name="message" placeholder="Write your message (optional)"/></div>
  <p className='text-left alert-txt mb-3' style={{color:'red',marginBottom:'0',marginTop:'1rem'}} id='ordrBtnTxt'></p>
  <button className="place-order-btn w-30  ml-5" onClick={clickHandler}>Place Order</button>
</div>
      </form>
    </div>
  </div>
  <ClientSlider/>
    </>
)
}

export default Home;