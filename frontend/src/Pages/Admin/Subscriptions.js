import React from 'react'
import axios from 'axios';


const Subscriptions = () =>{
    const [data,setData] = React.useState([]);
    
    React.useEffect(()=>{
      
          axios.get('https://backend.aquabird.pk/get-emails')
          .then((res)=>{
            setData(res.data);
        })
          .catch((err)=>console.log(err))
    },[])

    return(
        <>
            <div className="page-head">
 <h2 className="text-center">Subscription List</h2>   
 </div>
 {
    data.length != 0?(<>
    <div className="row w-70 mt-5 m-auto head-row">
<div className="col-6 order-head-txt">Subscribed email address</div>
<div className="col-6 order-head-txt">Activation</div>
</div>
{
    data.map((ele,i)=>{
        return(<div key={i}>
            <div className="row w-70 mt-5 m-auto data-row" style={{textAlign:'center'}}>
<div className="col-6 order-head-txt">{ele.email}</div>
<div className="col-6 order-head-txt">{ele.activate == 0?'inactive':'active'}</div>
</div>
</div>)})}
    </>):(<div><p className='text-center'>There is no data</p></div>)}
        </>)
}
  

export default Subscriptions;