import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from '../../component/LoadingSpinner';


const EditCoupon = () =>{
  const [isLoading,setIsLodaing] = React.useState(true);
  var [data, setData] = React.useState({});
  let navigate = useNavigate();


function ClickHandler(e) {
    e.preventDefault();
      if (data.couponCode && data.status) {
        axios.post('https://backend.aquabird.pk/update-coupon',data,{withCredentials:true})
         .then((res)=>{
          if (res.data == true) {
               document.getElementById('editCouponTxt').innerText = 'sucessfully updated...';
             navigate('/coupons');
             window.location.reload();
          }else{
            document.getElementById('editCouponTxt').innerText = 'not sucessfully updated...';
          }
         
         })
         .catch((err)=>console.log(err))
        }else{
          document.getElementById('editCouponTxt').innerText = 'sucessfully updated...';
        }
    
}
React.useEffect(()=>{
    setTimeout(()=>{
        setIsLodaing(false);
      },500)
axios.get(`https://backend.aquabird.pk/single-coupon/${window.location.href.split('/')[4]}`)
.then((res)=>{
setData(res.data);
})
.catch((err)=>console.log(err))
},[])

    return(<>
       {
        isLoading?(<LoadingSpinner/>):(<>
     <div className="page-head">
 <h2 className="text-center">update coupon</h2>   
 </div>
 <form className='w-40 m-auto text-center'>
<div className='mt-2 '>
<label className='d-block text-left login-field-label w-85 m-auto'>coupon code<span className="important-star">*</span></label>
<input type="text" className="login-input-field w-90 mt-1"  name="couponCode" value={data.couponCode} onChange={e=>setData({...data,couponCode:e.target.value})}  placeholder="coupon code"/>
</div>
<div className='mt-2 '>
<label className='d-block text-left login-field-label w-85 m-auto'>status<span className="important-star">*</span></label>
<select className="dropdown-input-field w-90 mt-1" value={data.status} onChange={e=>setData({...data,status:e.target.value})} >

  <option value='enable'>Enable</option>

  <option value="disable">Disable</option>

</select>
</div>
<p className='text-center alert-txt mb-3' style={{color:'red',marginBottom:'0',marginTop:'1rem'}} id='editCouponTxt'></p>

<button className=" py-3 w-90  proceed-to-checkout-btn mt-2 m-auto" onClick={ClickHandler}><span >Update</span></button>
</form>
  </>)}
    </>)
}

export default EditCoupon;