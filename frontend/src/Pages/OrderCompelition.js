import React from "react";
import { useParams } from "react-router-dom";


const OrderCompletion = () =>{
const params = useParams();

    return<>
      <div className='subscriptionTxt w-80 m-auto mt-5rem' style={{background: '#4bbee2',padding: '1vw',borderRadius: '9px'}}>
        <p className='w-75 m-auto text-center'>You have ordered successfully kindly note your order id is <span className="order-id"  style={{color:'yellow'}}>{params.id}</span></p>
        </div>
    </>
}

export default OrderCompletion;