import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProducts = () =>{
    const [data,setData] = React.useState([]);

    let navigate = useNavigate();

    React.useEffect(()=>{
        axios.get('https://backend.aquabird.pk/products',{withCredentials:true})
        .then((res)=>setData(res.data))
        .catch((err)=>console.log(err))

    },[])

    function addProduct(e) {
        e.preventDefault();
        navigate('/new-product');
        window.location.reload();
    }

    function deleteProduct(id) {
        let idData = {id:id};
        axios.post('https://backend.aquabird.pk/delete-product',idData)
        .then((res)=>{
            window.location.reload();
        })
        .catch((err)=>console.log(err))
    }
    return(
        <>
   <div className="page-head">
 <h2 className="text-center">our products</h2>   
 </div>
 <div className='text-left w-70 m-auto mt-5'>
 <button onClick={addProduct} className="w-15 mt- m-auto py-2 contact-form-btn">new product<span style={{fontSize:'17px',marginLeft:'0.3rem',fontWeight:'bold'}}>+</span></button>
 </div>
 <div>
 <div className="row w-70 mt-5 m-auto head-row">
<div className="col-2 order-head-txt">Product</div>
<div className="col-2"></div>
<div className="col-2 order-head-txt">Price</div>
<div className="col-2 order-head-txt">reviews</div>
<div className="col-2 order-head-txt">stars</div>
<div className="col-2 order-head-txt">action</div>
 </div>
 {
 data.length != 0 ? data.map((d,i)=>{
   return <div className="row w-70 text-center mt-3 m-auto data-row" >
    <div className="col-2 "><div className="w-50 item-img-div m-auto"><img className="w-100" src={d.icon} alt=""/></div></div>
    <a href={`/edit-product/${d.id}`} className="col-2 d-flex align-items-end"><p className="item-name">{d.name}</p></a>
    <div className="col-2 d-flex justify-content-center align-items-end"><p className="item-price">PKR {d.price}/-</p></div>
    <div className="col-2 d-flex justify-content-center align-items-end "><p className="item-price">{d.reviews}</p></div>
    <div className="col-2 d-flex justify-content-center align-items-end"><p className="item-price">{d.star}</p></div>
    <div  className="col-2 d-flex justify-content-center align-items-center"><button className="item-remove mt-3" onClick={(e)=>deleteProduct(d.id)}><sub className="mt-3">*</sub><span style={{marginLeft:'0.5vw'}}>Delete</span></button></div>
 </div>
  }):(<div className="text-center my-5 py-5" > no product is added yet...</div>)

}
 
 </div>
</>)}



export default AddProducts;