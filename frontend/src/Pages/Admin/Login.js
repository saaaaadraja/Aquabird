import React from 'react';
import axios from 'axios';
import LoadingSpinner from '../../component/LoadingSpinner';
import {useNavigate} from 'react-router-dom';


const Login = () =>{
var [user,setUser] = React.useState({userName:'' , password:''});
const [isLoading, setIsLoading] = React.useState(true);
var navigate = useNavigate();
    const Login = (evt)=>{
      evt.preventDefault();
      if (user.userName && user.password) {
        axios.post('https://backend.aquabird.pk/login',user,{withCredentials:true})
        .then((res)=>{
                navigate('/admin');
                window.location.reload();
        })
        .catch((err)=> document.getElementById('LoginTxt').innerText = err.response.data.message);
      }else{
        document.getElementById('LoginTxt').innerText = 'kindly fill the form properly....';
      }
    }
  React.useEffect(()=>{
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  },[])

return(<>
{
  isLoading?<LoadingSpinner/>:(
<div>
<h2 className='text-center w-100 mt-5 text-primary '>Login</h2>
<form className='w-40 m-auto text-center'>
<div className='mt-2 '>
<label className='d-block text-left login-field-label w-85 m-auto'>user name</label>
<input type="text" className="login-input-field w-90 mt-1" value={user.userName} name="name" onChange={(e)=>setUser({...user,userName:e.target.value})} placeholder="write your name"/>
</div>
<div className='mt-2 '>
<label className='d-block text-left login-field-label w-85 m-auto'>password</label>
<input type="password" className="login-input-field w-90 mt-1" value={user.password} name="password" onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="password"/>
</div>
<p className='text-center alert-txt mb-3' style={{color:'red',marginBottom:'0',marginTop:'1rem'}} id='LoginTxt'></p>
<button className=" py-3 w-90  proceed-to-checkout-btn mt-2 m-auto" onClick={(e)=>Login(e)}> <span >Login</span></button>
</form>
</div>)}
</>)
}


export default Login;