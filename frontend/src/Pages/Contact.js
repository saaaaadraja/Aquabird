import axios from "axios";
import React from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const Contact = () =>{

  const [contactData, setContactData] = React.useState({
    name:'',contactNumber:'',message:''
  })
const [IsNumber, setIsNumber] = React.useState(false);
 function changeHandler(e) {
  let {name,value }= e.target;
  setContactData({...contactData, [name]: value})
}
  
function submitHandler(e) {
  e.preventDefault();
  if (IsNumber && contactData.name && contactData.message) {
   axios.post('https://backend.aquabird.pk/contact',contactData)
   .then((res)=>{
    window.document.getElementById('contactTxt').style.color = 'green'; 
    window.document.getElementById('contactTxt').style.fontWeight = 'bold'; 
    window.document.getElementById('contactTxt').innerHTML = res.data;
    setContactData({
      name:'',contactNumber:'',message:''
    })
   })
   .catch((err)=>console.log(err))
  }else{
    window.document.getElementById('contactTxt').style.color = 'red'; 
    window.document.getElementById('contactTxt').style.fontWeight = 'bold'; 
window.document.getElementById('contactTxt').innerHTML = 'Kindly Fill The Form Properly'
setTimeout(() => {
  window.document.getElementById('contactTxt').innerHTML = ''
}, 2000);
   }
}
 return(<>
  <div className="page-head">
 <h2 className="text-center">Contact Us</h2>   
 <p className="about-txt w-50">Join us on a journey of pure hydration and vitality with Aquabird Reverse Osmosis Mineral Water. Experience the difference that advanced reverse osmosis technology can make in delivering exceptional purity, essential minerals, and unmatched refreshment. 
 Choose Aquabird for the ultimate drinking experience and elevate your hydration to new heights.</p>
          </div>
          <div>
            <form className="row w-75 mt-5 mb--10 m-auto">
                <div className="col-sm-12 col-md-6">
                <input type="text" className="contact-input-field w-100 mt-2" style={{borderRadius:'0'}} value={contactData.name} onChange={changeHandler} name="name" placeholder="Write your name"/>
                </div>
                <div className="col-sm-12 col-md-6 mt-2">
                <PhoneInput  country={'pk'} inputProps={{
    name: 'contctNumber',
    required: true,
  }}
  inputStyle={{width: '85%',borderRadius: '0',padding: '1.7vw 0vw',background: '#F0F0F0',marginLeft:'2.5rem'}}
  isValid={(value, country) => {
    if (value.match(/12345/)) {
      return 'Invalid phone number: '+value+', '+country.name;
    } else if (value.match(/1234/)) {
      return false;
    } else if (value.length > 2 && value.length < 12 ) {
      return 'Invalid value: '+value;
    }else {
      setIsNumber(true);
      return true;
    }
  }}
  value={contactData.contactNumber} onChange={(phone)=>setContactData({...contactData,contactNumber:phone})}/>
                {/* <input type="text" className="contact-input-field w-100" name="contactNumber" value={contactData.contactNumber} onChange={changeHandler} placeholder="+920000000000"/> */}
                </div>
                <div className="col-12 mt-3">
                <textarea rows="10" cols="50" className="contact-input-field w-100" style={{borderRadius:'0'}} value={contactData.message} name="message" onChange={changeHandler} placeholder="Write your message"/>
                </div>
                <div className="col-12">
</div>
<p className='text-center alert-txt ' style={{color:'red',marginBottom:'0',marginTop:'1rem'}} id='contactTxt'></p>
                <button className="w-20  m-auto py-2 contact-form-btn" style={{borderRadius:'0',marginTop:'0'}} onClick={submitHandler}>Send </button>
            </form>

          </div>
</>)
}

export default Contact