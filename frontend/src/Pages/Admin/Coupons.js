import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Coupons = () =>{
    const [data,setData] = React.useState([]);
    let navigate = useNavigate();
    function addCoupon(e) {
        e.preventDefault();
        navigate('/add-coupon');
        window.location.reload();
    }

    React.useState(()=>{
  axios.get('https://backend.aquabird.pk/get-coupons',{withCredentials:true})
  .then((res)=>{
    // const txt = res.data[0].couponCode;
    // var num = txt.replace(/[^0-9]/g, ''); 
    // console.log(parseInt(num,10));
    setData(res.data)
  })
  .catch((err)=>console.log(err))

    },[])
    function deleteCoupon(id) {
        let idData = {id:id};
        axios.post('https://backend.aquabird.pk/delete-coupon',idData)
        .then((res)=>{
            window.location.reload();
        })
        .catch((err)=>console.log(err))
    }
    return(<>
   <div className="page-head">
 <h2 className="text-center">Coupons</h2>   
 </div>
 <div className='text-left w-70 m-auto mt-5'>
 <button onClick={addCoupon} className="w-15 mt- m-auto py-2 contact-form-btn">new coupon<span style={{fontSize:'17px',marginLeft:'0.3rem',fontWeight:'bold'}}>+</span></button>
 </div>
 <div>
 <div className="row w-70 mt-5 m-auto head-row">
<div className="col-4 order-head-txt">Coupon Code</div>
<div className="col-4 order-head-txt">Status</div>
<div className="col-4 order-head-txt">Action</div>
 </div>
 {
 data.length != 0 ? data.map((d,i)=>{
   return <div className="row w-70 text-center mt-4 m-auto data-row" style={{paddingBottom:'0'}} >
    <a href={`/edit-coupon/${d.id}`} className="col-4 d-flex justify-content-center  "><p className="">{d.couponCode}</p></a>
    <div className="col-4 d-flex justify-content-center "><p className="">{d.status}</p></div>
    <div  className="col-4 d-flex justify-content-center " style={{marginTop:'-0.5vw'}}><button onClick={(e)=>deleteCoupon(d.id)} className="item-remove" ><sub >*</sub><span style={{marginLeft:'0.5vw'}}>Delete</span></button></div>
 </div>
  }):(<div className="text-center my-5 py-5" > no coupon code is added yet...</div>)

}
 
 </div>
</>)}


export default Coupons;