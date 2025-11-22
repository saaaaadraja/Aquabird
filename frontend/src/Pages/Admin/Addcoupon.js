import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCoupon = () =>{
    const [data,setData] = React.useState({couponCode:'',status:'enable'});
    const navigate = useNavigate();

    function handleChange(e) {
        setData({...data,status:e.target.value});
        console.log(e.target.value);
    }

    function ClickHandler(e) {
        e.preventDefault();
        if (data.couponCode && data.status) {
    const txt = data.couponCode;
    let num = txt.replace(/[^0-9]/g, ''); 
    let offPer = parseInt(num,10);
    if (offPer<100 && offPer>0) {
        axios.post('https://backend.aquabird.pk/add-coupon',data)
            .then((res)=>{
            document.getElementById('addCouponTxt').innerText =   'coupon code added successfully....';
              navigate('/coupons')
                window.location.reload();
            })
            .catch((err)=>console.log(err))
    }else{
        document.getElementById('addCouponTxt').innerText = 'kindly enter number in the range 0-99 in coupon code...';
    }
            
        }else{
            document.getElementById('addCouponTxt').innerText = 'kindly fill the form properly...';
        }
     
    }
    return(<>
        <div className="page-head">
 <h2 className="text-center">Coupons</h2>   
 </div>
 <form className='w-40 m-auto text-center'>
<div className='mt-2 '>
<label className='d-block text-left login-field-label w-85 m-auto'>coupon code<span className="important-star">*</span></label>
<input type="text" className="login-input-field w-90 mt-1"  name="couponCode" value={data.couponCode} onChange={e=>setData({...data,couponCode:e.target.value})}  placeholder="coupon code"/>
</div>
<div className='mt-2 '>
<label className='d-block text-left login-field-label w-85 m-auto'>status<span className="important-star">*</span></label>
<select className="dropdown-input-field w-90 mt-1" value={data.status} onChange={handleChange} >

  <option value='enable'>Enable</option>

  <option value="disable">Disable</option>

</select>
</div>
<p className='text-center alert-txt mb-3' style={{color:'red',marginBottom:'0',marginTop:'1rem'}} id='addCouponTxt'></p>
<button className=" py-3 w-90  proceed-to-checkout-btn mt-2 m-auto" onClick={ClickHandler}><span >save</span></button>
</form>
    </>)
}



export default AddCoupon;