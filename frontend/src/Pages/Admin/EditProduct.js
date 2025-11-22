import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from '../../component/LoadingSpinner';


const EditProduct = () =>{
  const [isLoading,setIsLodaing] = React.useState(true);
  var [newProduct, setNewProduct] = React.useState({
   id:'',name:'',price:'',security:'',refill:'',reviews:'',star:'',disable:'false',description:'',image:'',icon:''
})

  const [image, setImage] = React.useState()
  const [icon, setIcon] = React.useState()
const onImageChange = (event) => {
 if (event.target.files && event.target.files[0]) {
  setImage(URL.createObjectURL(event.target.files[0]));
   setNewProduct({...newProduct,image:event.target.files[0]});
 }
}
const onIconChange = (event) => {
  if (event.target.files && event.target.files[0]) {
    setIcon(URL.createObjectURL(event.target.files[0]));
    setNewProduct({...newProduct,icon:event.target.files[0]});
  }
 }
    let navigate = useNavigate();


function updateProduct(e) {
    e.preventDefault();
    const formData = new FormData();
      if (newProduct.name && newProduct.price && newProduct.reviews && newProduct.star && newProduct.description) {
       if (newProduct.security == '' || newProduct.security == null) {
        setNewProduct({newProduct,security:0});
       }
       if (newProduct.refill == ''   || newProduct.refill == null) {
        setNewProduct({newProduct,refill:0});
       }
        if (newProduct.image && newProduct.icon) {
          formData.append("data",JSON.stringify(newProduct));
          formData.append("files",newProduct.image);
          formData.append("files",newProduct.icon);
        axios.post('https://backend.aquabird.pk/update-product',formData,{withCredentials:true})
         .then((res)=>{
          if (res.data == true) {
             navigate('/add-products');
             window.location.reload();
          }else{
           document.getElementById('productUpdateTxt').innerText = 'not sucessfully updated...';
          }
         })
         .catch((err)=>console.log(err))
        }else{
          document.getElementById('productUpdateTxt').innerText =  'kindly upload product image and icon properly...'
        }
      }else{
        document.getElementById('productUpdateTxt').innerText = 'kindly fill the form properly...';
      }
    
}
React.useEffect(()=>{
    setTimeout(()=>{
        setIsLodaing(false);
      },500)
axios.get(`https://backend.aquabird.pk/single-product/${window.location.href.split('/')[4]}`)
.then((res)=>{
setNewProduct({
    id:res.data[0].id,
    name:res.data[0].name,
    price:res.data[0].price,
    security:res.data[0].SECURITY,
    refill:res.data[0].refill,
    reviews:res.data[0].reviews,
    star:res.data[0].star,
    disable:'false',
    description:res.data[0].description,
    image:res.data[0].image,
    icon:res.data[0].icon
});
setImage(res.data[0].image);
setIcon(res.data[0].icon);
})
.catch((err)=>console.log(err))
},[])

    return(<>
       {
        isLoading?(<LoadingSpinner/>):(<>
     <div className="page-head">
 <h2 className="text-center">add product</h2>   
 </div>
    <div className="row w-70 m-auto mt-5">
  <div className="col-8">
  <div className="col-12 text-left mb-3">
    <label className="checkout-field-label d-block" for="productname">product name <span className="important-star">*</span></label>
    <input type="text" className="checkout-input-field w-95" value={newProduct.name} onChange={(e)=>setNewProduct({...newProduct,name:e.target.value})}   name="productname" />
    </div>
  <div className="col-12 text-left mb-3">
  <label className="checkout-field-label d-block" for="price">price Pkr/-<span className="important-star">*</span></label>
    <input type="number" className="checkout-input-field w-95" value={newProduct.price} onChange={(e)=>setNewProduct({...newProduct,price:e.target.value})}  name="price"/>
    </div>
    <div className="col-12 text-left mb-3">
  <label className="checkout-field-label d-block" for="price">security Pkr/-<span className="important-star">*</span></label>
    <input type="number" className="checkout-input-field w-95" value={newProduct.security} onChange={(e)=>setNewProduct({...newProduct,security:e.target.value})}  name="security"/>
    </div>
    <div className="col-12 text-left mb-3">
  <label className="checkout-field-label d-block" for="price">Refill Bottle Price Pkr/-<span className="important-star">*</span></label>
    <input type="number" className="checkout-input-field w-95" value={newProduct.refill} onChange={(e)=>setNewProduct({...newProduct,refill:e.target.value})}  name="Bottle Refill"/>
    </div>
  <div className="col-12 text-left mb-3">
  <label className="checkout-field-label d-block" for="reviews">reviews <span className="important-star">*</span></label>
    <input type="number" className="checkout-input-field w-95" value={newProduct.reviews} onChange={(e)=>setNewProduct({...newProduct,reviews:e.target.value})} name="reviews" />
    </div>
    <div className="col-12 text-left mb-3">
  <label className="checkout-field-label d-block" for="stars">stars <span className="important-star">*</span></label>
    <input type="number" className="checkout-input-field w-95" value={newProduct.star} onChange={(e)=>setNewProduct({...newProduct,star:e.target.value})} min="1" max="5" name="stars" />
    </div>
    <div className="col-12 text-left mb-3">
  <label className="checkout-field-label d-block" for="description">description <span className="important-star">*</span></label>
    <textarea rows="7" cols="5" type="text" className="checkout-input-field w-95" style={{borderRadius:'0'}} value={newProduct.description} onChange={(e)=>setNewProduct({...newProduct,description:e.target.value})} name="description" />
    </div>
    </div>
    <div className="col-4">
    <div className="text-center">
    <label className="checkout-field-label d-block" for="productimage">product image <span className="important-star">*</span></label>
    <img className="w-60 h-50 m-auto mt-2" alt="preview image" src={image}/>
    <input type="file" name="productimage" accept="image/*" onChange={onImageChange} className="filetype w-70 mt-1" />
  </div>
  <div className="text-center mt-2">
  <label className="checkout-field-label d-block" for="productimage">product icon <span className="important-star">*</span></label>
    <img className="w-60 h-50 m-auto mt-2" alt="preview image" src={icon}/>
    <input type="file" name="producticon" accept="image/*" onChange={onIconChange} className="filetype w-70 mt-1" /> 
  </div>
    </div>
    <div className='text-center w-70 m-auto'>
    <p className='text-center alert-txt mb-3' style={{color:'red',marginBottom:'0',marginTop:'1rem'}} id='productUpdateTxt'></p>
 <button  className="w-20 mt- m-auto py-2 contact-form-btn" onClick={updateProduct}>update</button>
 </div>
  </div>
  </>)}
    </>)
}

export default EditProduct;