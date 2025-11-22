import React, { useEffect } from "react";
import cart from '../assets/images/Icon ionic-md-cart.png'
import star from '../assets/images/Icon feather-star.png'
import disabledStar from '../assets/images/Icon feather-star-disabled.png'
import axios from "axios";

const Products = () =>{
  const [data , setData] = React.useState([]);
  const [searchData , setSearchData] = React.useState([]);
  const [search , setSearch] = React.useState('');
  const [issearch , setIsSearch] = React.useState(false);
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
      setData(res.data);
    })
    .catch((err)=>console.log(err));
},[])


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
strData.subTotal = parseInt(pro[0].price) + parseInt(pro[0].SECURITY) + parseInt(pro[0].refill) ;
localStorage.setItem('cartData',JSON.stringify([...retArray,strData]));
window.location.reload();
}

function searchHandler() {
let searchingData = data.filter((ele)=>ele.name.includes(search));
setSearchData(searchingData);
if (search != '') {
  setIsSearch(true)
}else{
  setIsSearch(false)
}
}
function keyPressHandler(e) {
  if (e.key == "Enter") {
    searchHandler();
}
}

function searchChangeHandler(e) {
  setSearch(e.target.value);
  if (e.target.value == '') {
   setSearchData([]);
  }
}


    return(
        <>
          <div className="page-head">
 <h2 className="text-center">Our Products</h2>   
 <p className="about-txt w-50">Our flagship product, Reverse Osmosis Mineral Water, is the epitome of purity and quality. This water undergoes the advanced reverse osmosis purification process and subsequent mineralization, ensuring that you receive water that is both clean and replenishing. </p>
          </div>
          <div>
            <div className="w-100 m-auto">
             <div className="row w-90 w-sm-95 m-auto">
              <div className="col-10"><input type="text" className="w-100  input-padding" autoFocus={true}  value={search} onKeyDown={keyPressHandler} onChange={(e)=>searchChangeHandler(e)} placeholder="Search Products by Name" /></div>
              <div className="col-2  text-center"><button className="proceed-to-checkout-btn w-100 h-100" style={{borderRadius:'0',top:'0'}}  onClick={searchHandler}>Search</button></div>
             </div>
            </div>
            <div className="row w-90  m-auto ">
              {
             issearch && search.length > 0 || searchData.length > 0  ?searchData.map((ele)=>{
                  return(<>
                  {
                <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
      <div class="carousel-item d-flex flex-column text-center active" data-bs-interval="2000">
      <div className="slide w-70 pt-5 m-auto">
        <a href={`/details/${ele.id}`}>
    <img src={ele.image} class="d-block w-60 m-auto" alt="..."/>
    <p className="bottle-disc mt-4" style={{marginLeft:'0'}}>{ele.name}</p>
    </a>
      {
      ele.star == 1?(
      <div className="stars w-30 m-auto">
      <img  src={star} alt=""/>
      <img src={disabledStar} alt=""/>
      <img src={disabledStar} alt=""/>
      <img src={disabledStar} alt=""/>
      <img src={disabledStar} alt=""/>
      </div>): ele.star == 2?(
      <div className="stars w-30 m-auto">
      <img  src={star} alt=""/>
      <img src={star} alt=""/>
      <img src={disabledStar} alt=""/>
      <img src={disabledStar} alt=""/>
      <img src={disabledStar} alt=""/>
      </div>): ele.star == 3?(
      <div className="stars w-30 m-auto">
      <img  src={star} alt=""/>
      <img src={star} alt=""/>
      <img src={star} alt=""/>
      <img src={disabledStar} alt=""/>
      <img src={disabledStar} alt=""/>
      </div>): ele.star == 4?(
      <div className="stars w-30 m-auto">
      <img  src={star} alt=""/>
      <img src={star} alt=""/>
      <img src={star} alt=""/>
      <img src={star} alt=""/>
      <img src={disabledStar} alt=""/>
      </div>): ele.star == 5?(
      <div className="stars w-30 m-auto">
      <img  src={star} alt=""/>
      <img src={star} alt=""/>
      <img src={star} alt=""/>
      <img src={star} alt=""/>
      <img src={star} alt=""/>
      </div>):''}
    <p className="review-txt">({ele.reviews} reviews)</p>
    <p className="price-txt">PKR {ele.price}/-</p>
{
ele.disable == 'true'?(<button className='m-auto py-2 add-to-cart-btn btn-disabled' disabled ><img  src={cart} alt=""/> <span style={{marginLeft:'0.5vw'}}>Added</span></button>)
      :(<button className='m-auto py-2 add-to-cart-btn '   onClick={()=>clickHandler(ele.id)}><img  src={cart} alt=""/> <span style={{marginLeft:'0.5vw'}}>Add to cart</span></button>)
    }
   
    </div>
  </div>
  </div>}
                  </>)
              })
:data.map((ele,i)=>{
                    return(<>
                    {
                  <div className="col-4 mt-5">
        <div class="carousel-item d-flex flex-column text-center active" data-bs-interval="2000">
        <div className="slide w-70 pt-5 m-auto">
          <a href={`/details/${ele.id}`}>
      <img src={ele.image} class="d-block w-60 m-auto" alt="..."/>
      <p className="bottle-disc mt-4" style={{marginLeft:'0'}}>{ele.name}</p>
      </a>
        {
        ele.star == 1?(
        <div className="stars w-30 m-auto">
        <img  src={star} alt=""/>
        <img src={disabledStar} alt=""/>
        <img src={disabledStar} alt=""/>
        <img src={disabledStar} alt=""/>
        <img src={disabledStar} alt=""/>
        </div>): ele.star == 2?(
        <div className="stars w-30 m-auto">
        <img  src={star} alt=""/>
        <img src={star} alt=""/>
        <img src={disabledStar} alt=""/>
        <img src={disabledStar} alt=""/>
        <img src={disabledStar} alt=""/>
        </div>): ele.star == 3?(
        <div className="stars w-30 m-auto">
        <img  src={star} alt=""/>
        <img src={star} alt=""/>
        <img src={star} alt=""/>
        <img src={disabledStar} alt=""/>
        <img src={disabledStar} alt=""/>
        </div>): ele.star == 4?(
        <div className="stars w-30 m-auto">
        <img  src={star} alt=""/>
        <img src={star} alt=""/>
        <img src={star} alt=""/>
        <img src={star} alt=""/>
        <img src={disabledStar} alt=""/>
        </div>): ele.star == 5?(
        <div className="stars w-30 m-auto">
        <img  src={star} alt=""/>
        <img src={star} alt=""/>
        <img src={star} alt=""/>
        <img src={star} alt=""/>
        <img src={star} alt=""/>
        </div>):''}
      <p className="review-txt">({ele.reviews} reviews)</p>
      <p className="price-txt">PKR {ele.price}/-</p>
{
 ele.disable == 'true'?(<button className='m-auto py-2 add-to-cart-btn btn-disabled' disabled ><img  src={cart} alt=""/> <span style={{marginLeft:'0.5vw'}}>Added</span></button>)
        :(<button className='m-auto py-2 add-to-cart-btn '  onClick={()=>clickHandler(ele.id)}><img  src={cart} alt=""/> <span style={{marginLeft:'0.5vw'}}>Add to cart</span></button>)
      }
     
      </div>
    </div>
    </div>}
                    </>)
                })
              }
            </div>
          </div>
        </>
    )
} 

export default Products;