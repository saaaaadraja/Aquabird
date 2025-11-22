import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate} from 'react-router-dom'

// images

import logo from '../assets/images/Logo1.png'
import cart from '../assets/images/Icon ionic-md-cart.png'
import search from '../assets/images/Icon feather-search.png'

function activeNavItem(path) {
  var ele = document.querySelectorAll('.nav-link');
  ele.forEach((element) => {
   element.classList.remove('active');
  });
  if (path == '/') {
   ele[0].classList.add('active');
  }else if(path == '/about'){
   ele[1].classList.add('active');
  }else if(path == '/products'){
   ele[2].classList.add('active');
  }else if(path == '/contact'){
   ele[3].classList.add('active');
  }

}

const Header=()=>{
  const navigate = useNavigate();
  const clickHandler=(id)=>{
   activeNavItem(`${id}`);
    navigate(`${id}`);
    window.location.reload();
  }

  React.useEffect(()=>{
    var path = window.location.pathname;
    activeNavItem(path);
    let returnData = localStorage.getItem("cartData");
    let retData = JSON.parse(returnData);
    if (retData && retData.length>0) {
      window.document.getElementById('cart-count-bg').style.display= 'block';
    }else{
      window.document.getElementById('cart-count-bg').style.display= 'none';
    }
  },[])
    return(
        <div>
             <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid style={{width:'95%'}}>
        <Navbar.Brand onClick={(e)=>clickHandler('/')}><img style={{    width: '90%',marginLeft: '-2vw',marginTop:'1vw'}} src={logo} alt=''/> </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="m-auto my-2 my-lg-0 gap-4"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className='active' onClick={(e)=>clickHandler('/')}>Home</Nav.Link>
            <Nav.Link onClick={(e)=>clickHandler('/about')}>About us</Nav.Link>
            <Nav.Link onClick={(e)=>clickHandler('/products')}>Products</Nav.Link>
            <Nav.Link onClick={(e)=>clickHandler('/contact')}>Contact</Nav.Link>
          </Nav>
          <Form className="d-flex gap-3">
            <div className='position-relative'>
          <Button variant="outline-success rounded-circle" onClick={(e)=>clickHandler('/my-cart')}><img style={{marginTop:'-0.3vw'}} className='w-50' src={cart} alt=''/></Button>
          <div className='position-absolute cart-cout-bg' id='cart-count-bg' style={{display:'none'}}>
          </div>
          </div>
          <Button variant="outline-success rounded-circle" onClick={(e)=>clickHandler('/products')} ><img style={{marginTop:'-0.3vw'}} className='w-50' src={search} alt=''/></Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </div>
    )
}

export default Header;