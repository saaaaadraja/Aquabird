import React from "react";
import phone from '../assets/images/Icon awesome-phone.png'
import logo from '../assets/images/Logo2.png'
import facebook from '../assets/images/Icon awesome-facebook.png'
import insta from '../assets/images/Icon awesome-instagram.png'
import whatsapp from '../assets/images/Icon awesome-whatsapp.png'

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Footer = () =>{

    const [email,setEmail] = React.useState('');

    let navigate = useNavigate();
    function socialTab(path) {
      window.open(path,'_blank')
    }
function sendEmail(e) {
    e.preventDefault();
    if (email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            const Email = {email:email};
        axios.post('https://backend.aquabird.pk/send-mail',Email)
        .then((res)=>{
            window.document.getElementById('sendEmailTxt').style.color = 'green'; 
            window.document.getElementById('sendEmailTxt').style.fontWeight = 'bold'; 
            document.getElementById('sendEmailTxt').innerText = res.data;
            setEmail('');
            setTimeout(() => {
                document.getElementById('sendEmailTxt').innerText = '';
            }, 2000);
        })
        .catch((err)=>console.log(err))
        }else{
            window.document.getElementById('sendEmailTxt').style.color = 'red'; 
            window.document.getElementById('sendEmailTxt').style.fontWeight = 'bold'; 
            document.getElementById('sendEmailTxt').innerText ='enter correct email address';
            setTimeout(() => {
                document.getElementById('sendEmailTxt').innerText = '';
            }, 2000);
        }
    }else{
        window.document.getElementById('sendEmailTxt').style.color = 'red'; 
        window.document.getElementById('sendEmailTxt').style.fontWeight = 'bold'; 
        document.getElementById('sendEmailTxt').innerText = 'First enter an email address then press subscribe button';
    setTimeout(() => {
        document.getElementById('sendEmailTxt').innerText = '';
    }, 2000);
    }
   
}

return(
    <>
    <div className="footer pt-5">
        <div className="text-center contact-footer"><p className="footer-txt d-inline">Please Call Us for Extraordinary Service</p>
        <div className="d-md-inline d-sm-block w-100 m-auto contact-txt"><a style={{textDecoration:'none'}} href="tel:+92310-0002198"> <span><img className="w-11" src={phone} alt=""/></span><span className="num-txt">0310 0002198</span></a></div></div>
        <div className="row w-50 mt-5 m-auto">
            <div className="col-lg-4 col-md-12 footer-logo">
                <img src={logo} alt=""/>
                <p className="footer-logo-txt text-white text-center">A product of Parashoot PVT Ltd</p>
            </div>
            <div className="col-lg-1 col-md-0"></div>
            <div className="col-lg-7 col-md-12 footer-logo">
            <p className="footer-newsletter-txt ">NewsLetter</p>
            <p className='text-left alert-txt mb-3' style={{color:'red',marginBottom:'0',marginTop:'1rem'}} id='sendEmailTxt'></p>
            <div className="subscribe-email"><input type="email" style={{width:'65%'}} className="email-input-field" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" placeholder="Enter your Email"/><button style={{width:'35%'}} className="sub-btn" onClick={sendEmail}>Subscribe</button></div>
            </div>
        </div>
        <div className="footer-last row">
            <div className="col-md-4 col-sm-12 text-center rights-txt" style={{fontSize:'14px'}}>Copyright © 2023 All right reserved by Aquabird TM</div>
            <div className="col-md-4 col-sm-12 mt-sm-1 text-center">
                <div className="d-flex flex-row justify-content-center gap-3">
                  <img onClick={()=>socialTab('https://api.whatsapp.com/send/?phone=%2B923100002198&text&type=phone_number&app_absent=0')} className="socialLinks w-5 h-1" src={whatsapp} alt=""/> 
                  <img onClick={()=>socialTab('https://www.facebook.com/Aquabird-112926341884749')} className="socialLinks w-5 h-1" src={facebook} alt=""/>
                    <img onClick={()=>socialTab('https://www.instagram.com/aquabird_official/')} className="socialLinks w-5 h-1" src={insta} alt=""/>
                    </div>
            </div>
            <div className="col-md-4 col-sm-12 mt-sm-1 text-center">
                <p className="rights-txt privacyLink" style={{fontSize:'14px'}} onClick={()=>{navigate('/privacy-policy/');
                window.location.reload(); }}>Terms and Services <span className="mx-1">|</span> Privacy Policy</p>
            </div>
        </div>
    </div>
    </>
)
}


export default Footer;