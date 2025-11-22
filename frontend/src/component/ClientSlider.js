import React from "react";


import arrow from '../assets/images/Icon ionic-ios-arrow-forward.png'
import client1 from '../assets/images/client1.png'
import client2 from '../assets/images/client2.png'

const ClientSlider = () =>{
    var [clients,setClients] = React.useState([{img:client1,name:'Fatima Ali',review:`Overall, I'm satisfied with my purchase of Aquabird mineral water. It provides a refreshing and pure drinking experience, and I feel confident in its quality and mineral content. I will continue to choose this brand for my hydration needs.`},
    {img:client2,name:'Azaan Malik',review:`What I appreciate most is the brand's commitment to purity and quality. The label clearly states that the water undergoes a rigorous purification process, including reverse osmosis, which gives me confidence that it's free from impurities and contaminants. I also checked their website and found information about the mineral composition, which includes essential minerals like calcium, magnesium, and potassium.`},
    {img:client1,name:'Amna Batool',review:`In terms of value for money, I believe this Aquabird mineral water is worth every penny. The quality, taste, and mineral content justify the slightly higher price compared to regular bottled water. Investing in my health is a priority, and this mineral water allows me to do just that.`}])
var [slideIndex,setSlideIndex] = React.useState(1);
var timer='';

function plusSlides(n) {
  showSlides(slideIndex += n);
}


function showSlides(n) {
  window.clearTimeout(timer);
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";  
  timer=setTimeout(() => {
    if (n > slides.length) {n = 1}
  if (n < 1) {n = slides.length}
  slideIndex=1;
  plusSlides(n);
 }, 5000);
}

React.useEffect(()=>{
        showSlides(slideIndex);
},[])
    return(<>
    
        <div className="client-reviews">
        <div id="carouselExampleDark" class=" w-100 m-auto carousel carousel-dark mt-5" data-bs-ride="carousel">
        {
   clients.map((ele,i)=>{
    return(
      <div class="w-90 m-auto mySlides displayFade" style={{display:'none'}} >
        <div class="carousel-item d-flex flex-column active text-center" data-bs-interval="2000">
            <div className="slide1 w-70  m-auto" style={{borderRadius:'45px'}}>
              <div><img className="rounded-circle w-20 client-img" src={ele.img} alt=""/></div>
          <p className="bottle-disc w-85 mt--7 px-3 ">{ele.review}
           <p className="clien-name">{ele.name}</p></p>
          </div>
        </div>
      </div>
        )
    })     
   
 }
      <button class="carousel-control-prev" style={{top:'8vw'}} onClick={()=>plusSlides(-1)}  type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
        <span ><img className="rotate-180 arrow-btn" style={{transform:'rotate(180deg)'}} src={arrow} alt=""/></span>
      </button>
      <button class="carousel-control-next" style={{top:'8vw'}} onClick={()=>plusSlides(1)} type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
      <span ><img className=" arrow-btn" src={arrow} alt=""/></span>
      </button>
      </div>
        </div>
  </>)
}



export default ClientSlider;