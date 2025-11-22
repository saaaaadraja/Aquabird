import React from 'react'
import axios from 'axios'

const OrderList = () =>{

const [data,setData] = React.useState([]);
const [searchData , setSearchData] = React.useState([]);
const [search , setSearch] = React.useState('');
const [issearch , setIsSearch] = React.useState(false);
     React.useEffect(()=>{
      
        axios.get('https://backend.aquabird.pk/getData',{withCredentials:true})
        .then((res)=>{
            res.data.map((ele,i)=>{
                let sum = 0;
               JSON.parse(ele.order).map((d)=>{
                    sum = sum + d.subTotal ;
                })
              res.data[i] = {...res.data[i],total:sum}
            })
         let resData = res.data.sort(sortByDate);
            setData(resData);
        })
        .catch((err)=>console.log(err))
    },[])
    function sortByDate(a, b) {
        if (a.date < b.date) {
            return 1;
        }
        if (a.date > b.date) {
            return -1;
        }
        return 0;
    }
    function deleteOrder(id) {
        let idData = {id:id};
        axios.post('https://backend.aquabird.pk/delete-order',idData)
        .then((res)=>{
            window.location.reload();
        })
        .catch((err)=>console.log(err))
    }


    function searchHandler() {
        let searchingData = data.filter((ele)=>ele.email.includes(search) || ele.id.includes(search));
        setSearchData(searchingData);
        if (search != '') {
          setIsSearch(true)
        }else{
          setIsSearch(false)
        }
        }
        function keyPressHandler(e) {
          if (e.key == "Enter") {
            searchHandler();
        }
        }
        
        function searchChangeHandler(e) {
          setSearch(e.target.value);
          if (e.target.value == '') {
           setSearchData([]);
          }
        }

    return(<>
   <div className="page-head">
 <h2 className="text-center">order list</h2>   
 </div>
 <div className="w-90 m-auto">
             <div className="row w-80 m-auto">
              <div className="col-10"><input type="text" className="w-100  py-2" autoFocus={true}  value={search} onKeyDown={keyPressHandler} onChange={(e)=>searchChangeHandler(e)} placeholder="Search by order id or email" /></div>
              <div className="col-2  text-center"><button className="proceed-to-checkout-btn w-100 h-100" style={{borderRadius:'0',top:'0'}}  onClick={searchHandler}>Search</button></div>
             </div>
            </div>
 {
    data.length != 0?(<>
 <div className="row w-70 mt-5 m-auto head-row">
<div className="col-2 order-head-txt">client Name</div>
<div className="col-2 order-head-txt">order details</div>
<div className="col-2 order-head-txt">phone number</div>
<div className="col-2 order-head-txt">email</div>
<div className="col-2 order-head-txt">total</div>
<div className="col-2 order-head-txt">Action</div>
<div className="col-2"></div>
 </div>
 { issearch && search.length > 0 || searchData.length > 0  ?searchData.map((ele,i)=>{
        return(<div key={i}>
            <div className="row w-70 mt-5 m-auto " style={{padding:'0.8px 0',textAlign:'center'}}>
<div className="col-2 order-head-txt">{ele.firstName+' '+ele.lastName}</div>
<a href={`/order-list/${ele.id}`} className="col-2 order-head-txt">order details</a>
<div className="col-2 order-head-txt">+{ele.contactnumber}</div>
<div className="col-2 order-head-txt">{ele.email}</div>
<div className="col-2 order-head-txt">PKR {ele.total - ele.discount}/-</div>
<div  className="col-2 order-head-txt "><button className="item-remove" onClick={(e)=>deleteOrder(ele.id)}><sub className="mt-3">*</sub><span style={{marginLeft:'0.5vw'}}>Delete</span></button></div>
<div className="col-2"></div>
 </div>
        </div>)
    }):data.map((ele,i)=>{
        return(<div key={i}>
            <div className="row w-70 mt-5 m-auto " style={{padding:'0.8px 0',textAlign:'center'}}>
<div className="col-2 order-head-txt">{ele.firstName+' '+ele.lastName}</div>
<a href={`/order-list/${ele.id}`} className="col-2 order-head-txt">order details</a>
<div className="col-2 order-head-txt">+{ele.contactnumber}</div>
<div className="col-2 order-head-txt">{ele.email}</div>
<div className="col-2 order-head-txt">PKR {ele.total - ele.discount}/-</div>
<div  className="col-2 order-head-txt "><button className="item-remove" onClick={(e)=>deleteOrder(ele.id)}><sub className="mt-3">*</sub><span style={{marginLeft:'0.5vw'}}>Delete</span></button></div>
<div className="col-2"></div>
 </div>
        </div>)
    })
 }</>):(<div><p className='text-center'>There is no data</p></div>)
}
</>
)}


export default OrderList;