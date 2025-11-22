import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate} from 'react-router-dom'

// images

import logo from '../assets/images/Logo1.png'
import axios from 'axios';

function activeNavItem(path) {
  var ele = document.querySelectorAll('.nav-link');
  ele.forEach((element) => {
   element.classList.remove('active');
  });
  if (path == '/order-list') {
   ele[0].classList.add('active');
  }else if(path == '/add-products'){
   ele[1].classList.add('active');
  }else if(path == '/coupons'){
   ele[2].classList.add('active');
  }else if(path == '/subscriptions'){
   ele[3].classList.add('active');
  }

}

const HeaderAdmin=()=>{
  const navigate = useNavigate();
  const clickHandler=(id)=>{
   activeNavItem(`${id}`);
    navigate(`${id}`);
    window.location.reload();
  }

  function logoutHandler(e) {
    e.preventDefault();
    axios.get('https://backend.aquabird.pk/logout',{withCredentials:true})
    .then((res)=>{
      navigate('/login');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    })
    .catch((err)=>console.log(err))
  }

  React.useEffect(()=>{
    var path = window.location.pathname;
    activeNavItem(path);
  },[])
    return(
        <div>
             <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid style={{width:'95%'}}>
        <Navbar.Brand onClick={(e)=>clickHandler('/order-list')}><img style={{    width: '70%',marginLeft: '-2vw',marginTop:'1vw'}} src={logo} alt=''/> </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="m-auto my-2 my-lg-0 gap-4"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className='active' onClick={(e)=>clickHandler('/order-list')}>Order List</Nav.Link>
            <Nav.Link onClick={(e)=>clickHandler('/add-products')}>Products</Nav.Link>
            <Nav.Link onClick={(e)=>clickHandler('/coupons')}>Coupons</Nav.Link>
            <Nav.Link onClick={(e)=>clickHandler('/subscriptions')}>Subscriptions</Nav.Link>
          </Nav>
          <Form className="d-flex gap-3">
     {window.location.href.split('/')[3] != 'login'?<div><button className='text-white' onClick={logoutHandler}>Logout</button></div>:''}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </div>
    )
}

export default HeaderAdmin;