import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';

const Subscription = () =>{
    const params = useParams();

    useEffect(()=>{
       const data = {email:params.id};
    axios.post('https://backend.aquabird.pk/activate-email', data)
   .then((res)=>{
document.getElementById('subsribe-txt').innerText = res.data;
   }
)
   .catch((err)=>console.log(err))
    },[])
    return(
        <>
        <div className='mt-5 subscriptionTxt'>
        <p className='w-75 m-auto text-center' id='subsribe-txt'></p>
        </div>
        </>
    )
}


export default Subscription;