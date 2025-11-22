import React from "react";
import nineTeenL from '../assets/images/P1.png'
import star from '../assets/images/Icon feather-star.png'
import disabledStar from '../assets/images/Icon feather-star-disabled.png'
import cart from '../assets/images/Icon ionic-md-cart.png'
import Slider from '../component/Slider'
import axios from "axios";
import { useParams } from "react-router-dom";

const Details=()=>{
  const [data , setData] = React.useState([]);
const changeTab=(btnId,tabId)=>{
document.getElementsByClassName('detail-btns')[0].classList.remove('active');
document.getElementsByClassName('detail-btns')[1].classList.remove('active');
document.getElementsByClassName('details-div')[0].classList.remove('active');
document.getElementsByClassName('details-div')[1].classList.remove('active');
document.getElementById(btnId).classList.add('active');
document.getElementById(tabId).classList.add('active');
}
const clickHandler = (id) =>{
  let retString = localStorage.getItem("cartData");
  let retArray = [];
  if (retString != null) {
    retArray = JSON.parse(retString);
  }
var pro = data.filter(ele => ele.id === id);
let strData = pro[0];
strData.disable = 'true';
strData.quantity = 1;
strData.subTotal = pro[0].price;
localStorage.setItem('cartData',JSON.stringify([...retArray,strData]));
window.location.reload();
}
let params = useParams();
React.useEffect(()=>{
  axios.get('https://backend.aquabird.pk/products',{withCredentials:true})
  .then((res)=>{
    let returnData = localStorage.getItem("cartData");
    let retData = JSON.parse(returnData);
    if (retData != null) {
      res.data.map((ele,i)=>{
       retData.map((resData,j)=>{
         if(ele.id == resData.id){
         res.data[i].disable =  resData.disable;
         }
       })
      }
      )
     }
     
    let productDetail = res.data.filter((ele)=>ele.id == params.id)
setData(productDetail);
  })
  .catch((err)=>console.log(err))
},[])
    return(
        <>
         <div className="page-head">
 <h2 className="text-center">Product Details</h2>   
 <p className="about-txt w-50">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore </p>
          </div>
          {
            data.map((d)=>{
            return<>
            <div className="row mt-5 w-50 m-auto">
            <div className="col-5">
               <div className=" m-auto text-center detail-img">
                <img  src={d.image} alt=""/>
               </div>
            </div>
            <div className="col-1"></div>
            <div className="col-6 pl-5">
                <h1 className="mt-2 text-left">{d.name}</h1>
                <div className="row">
                    <div className="col-6 pl-0"> <p className="price-txt">PKR {d.price}/-</p></div>
                    <div className="col-6 pt-1 d-flex flex-row ">
                    {
        d.star == 1?(
        <div className="stars ml--2 w-70 mt-0">
        <img  src={star} alt=""/>
        <img src={disabledStar} alt=""/>
        <img src={disabledStar} alt=""/>
        <img src={disabledStar} alt=""/>
        <img src={disabledStar} alt=""/>
        </div>): d.star == 2?(
        <div className="stars ml--2 w-70 mt-0">
        <img  src={star} alt=""/>
        <img src={star} alt=""/>
        <img src={disabledStar} alt=""/>
        <img src={disabledStar} alt=""/>
        <img src={disabledStar} alt=""/>
        </div>): d.star == 3?(
        <div className="stars ml--2 w-70 mt-0">
        <img  src={star} alt=""/>
        <img src={star} alt=""/>
        <img src={star} alt=""/>
        <img src={disabledStar} alt=""/>
        <img src={disabledStar} alt=""/>
        </div>): d.star == 4?(
        <div className="stars ml--2 w-70 mt-0">
        <img  src={star} alt=""/>
        <img src={star} alt=""/>
        <img src={star} alt=""/>
        <img src={star} alt=""/>
        <img src={disabledStar} alt=""/>
        </div>): d.star == 5?(
        <div className="stars ml--2 w-70 mt-0">
        <img   src={star} alt=""/>
        <img src={star} alt=""/>
        <img src={star} alt=""/>
        <img src={star} alt=""/>
        <img src={star} alt=""/>
        </div>):''}  
    
      <p className="detail-review-txt ml-5">({d.reviews} reviews)</p>
                    </div>
                    <div className="product-status w-30">
                        In Stock
                    </div>
                    <p className="detail-txt mt-1 mb-2">Our product is our natural mineral water sourced from pristine springs which goes through REVERSE OSMOSIS
                         PURIFICATION process. It is carefully treated to preserve its natural minerals and deliver 
                         a refreshing and pure drinking experience.</p>
                     
                         {
 d.disable == 'true'?(<button className='m-auto py-2 add-to-cart-btn btn-disabled' disabled ><img  src={cart} alt=""/> <span style={{marginLeft:'0.5vw'}}>Added</span></button>)
        :(<button className='m-auto py-2 add-to-cart-btn '  onClick={()=>clickHandler(d.id)}><img  src={cart} alt=""/> <span style={{marginLeft:'0.5vw'}}>Add to cart</span></button>)
      }  </div>
            </div>
          </div>
          </>
            })
          
}
          <div className="row w-50 mt-5 m-auto">
          <div className="col-2 text-right p-0 ml-1">
            <button className="w-100 detail-btns active" id="desc-btn" onClick={(e)=>changeTab('desc-btn','desc-tab')}>Description</button>
          </div>
          <div className="col-2 text-left p-0 ml-1">
            <button className="w-100 detail-btns" id="reviews-btn" onClick={(e)=>changeTab('reviews-btn','reviews-tab')}>Reviews</button>
          </div>
          </div>
          <div className="details-div active w-50 mt-4 m-auto" style={{display:'none'}} id="desc-tab">
          Our product is our natural mineral water sourced from pristine springs which goes through <span className="font-weight-bold">REVERSE OSMOSIS PURIFICATION</span> process. It is carefully treated to preserve its natural minerals and deliver a refreshing and pure drinking experience.<br/><br/>
At Aquabird, we are committed to providing you with the purest and most refreshing mineral water using advanced reverse osmosis technology. Our goal is to offer you a premium drinking experience that combines exceptional purity with the perfect balance of essential minerals for your overall well-being.
          </div>
          <div className="details-div w-50 mt-4 m-auto text-center" style={{display:'none'}} id="reviews-tab">
          </div>
          <div className="mt-5">
            <h4 className="related-prods-head mt-5">Related Products</h4>
            <p className="related-prods-txt w-30 m-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore </p>
          </div>
          <div className="w-80 mb--10 m-auto">
          <Slider/>
          </div>
        </>
    )
}


export default Details;