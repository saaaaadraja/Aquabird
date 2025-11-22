import React from "react";
import nineteenL from  '../assets/images/19L-about.png'
import sixL from  '../assets/images/6.png'
import threeL from  '../assets/images/3.png'
import arrowLong from  '../assets/images/Icon awesome-long-arrow-alt-right.png'
import ClientSlider from '../component/ClientSlider'
import { useNavigate } from "react-router-dom";

const About = () =>{
    let navigate = useNavigate();
    function gotoProducts(path) {
        navigate(path);
        window.location.reload()
      }
    return(<>
    <div className="page-head">
 <h2 className="text-center">About us</h2>   
 <p className="about-txt w-50">At Aquabird, we are passionate about bringing you the finest mineral water that not only quenches your thirst but also nourishes your body. Our commitment to quality, purity, and taste sets us apart as a premium brand in the industry of mineral water. </p>
 </div>
 <div className="trusted-bottle-sect row w-90 mt-5 m-auto">
    <div className="col-xl-6 col-lg-12 text-center">
        <img className="w-90 " src={nineteenL} alt=""/>
    </div>
    <div className="col-xl-6 col-lg-12 about-sec1-text">
        <h2 className="main-head  mt-5">A Trusted in
        <br/>
Bottled Company</h2>
<p className=" about-us-txt w-80 m-auto">At Aquabird, we are passionate about bringing you the finest mineral water that not only quenches your thirst but also nourishes your body. Our commitment to quality,
     purity, and taste sets us apart as a premium brand in the industry of mineral water.</p>
     <img src={sixL} alt=""/>
     <h6 className="mt-2">Reverse Osmosis process</h6>
     <p className="reverse-txt w-80 m-auto">Aquabird mineral water goes through the reverse osmosis purification process which remove impurities, improve taste and odor, increase energy efficiency.</p>
     <button className="mt-5 m-auto py-2 add-to-cart-btn w-25" onClick={()=>gotoProducts('/products')}>Order Now <img style={{marginLeft:'0.5vw'}} src={arrowLong} alt=""/> <span className="ml-1"></span></button>
    </div>
 </div>
 <div className="trusted-bottle-sect row w-90 mt-10 pb-10 m-auto rotate-180">
    <div className="col-lg-6 col-md-12 rotate-180">
        <h2 className="main-head text-left mt-6">Why Choose Us</h2>
<ul className="text-left about-us-txt w-100">
  <li style={{listStyleType: 'square'}}>Pristine Source: Our mineral water is sourced from natural springs in untouched environments, ensuring the highest level of purity. The water is carefully collected from protected underground sources, safeguarding its pristine nature and preserving its natural mineral content.</li>
  <li style={{listStyleType: 'square'}}>Advanced Filtration: We utilize advanced filtration techniques, including reverse osmosis, to remove impurities, contaminants, and unwanted substances from the water. This process ensures that you are left with only the purest, cleanest, and safest drinking water.</li>
  <li style={{listStyleType: 'square'}}>Essential Mineral Enrichment: While maintaining purity, we also recognize the importance of replenishing essential minerals that are beneficial for your health. Our mineral water is enriched with a balanced blend of minerals, including calcium, magnesium, potassium, and trace minerals, to support your overall well-being.</li> 
  <li style={{listStyleType: 'square'}}>Refreshing Taste: Aquabird Mineral Water offers a crisp and refreshing taste that is smooth on the palate. Our commitment to purity and quality ensures that you enjoy the natural flavors of the water without any unpleasant aftertaste.</li>
  <li style={{listStyleType: 'square'}}>Quality Assurance: We are dedicated to providing you with the highest quality mineral water. Our water undergoes rigorous testing and quality control measures at every stage, from sourcing to bottling, ensuring that you receive a consistently superior product.</li>
  <li style={{listStyleType: 'square'}}>Sustainable Packaging: At Aquabird, we believe in sustainable practices. Our bottles are made from environmentally friendly materials and are fully recyclable. We aim to minimize our environmental impact and contribute to a greener future.</li>
  <li style={{listStyleType: 'square'}}>Hydration for a Healthy Lifestyle: Hydration is essential for maintaining overall health and vitality. With Aquabird Mineral Water, you can hydrate your body while enjoying the benefits of essential minerals, helping you stay energized and refreshed throughout the day.</li>
</ul>
    </div>
    <div className="col-lg-6 col-md-12 m-auto rotate-180">
        <img className=" w-100" src={threeL} alt=""/>
    </div>
 </div>
 <div className="client-reviews">
 <ClientSlider/>
  </div>
    </>)
}


export default About;