import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../logo.png';
import deakin_logo from '../deakin_logo.png';


const Layout = () => {
  return (
    <>
      <div class="row p-1" style={{"background-color":"#1E8449"}}>
      <div class="col-1 px-5"></div>
        <div class="col-4 px-5"> <img src={logo}  alt="logo" style={{width:"100%", height:"100%"}} /></div>
        <div class="col-4 px-5"></div>
        <div class="col-3 px-5 mt-4"> <img src={deakin_logo}  alt="logo" style={{width:"60%"}} /></div>
      
      </div>
      <div class="row" >
      <Navbar variant="dark" expand="lg" className="justify-content-center" style={{"background-color":"#145A32"}}>
        <Container fluid >
          
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
            <Nav className='m-auto'>
            <Navbar.Brand href="/" stype={{"width": "100px"}}>Home</Navbar.Brand>
            <Navbar.Brand href="/download">Download</Navbar.Brand>
            <Navbar.Brand href="/examples">Examples</Navbar.Brand>
            <Navbar.Brand href="/visualize">Visualize</Navbar.Brand>
            <Navbar.Brand href="/people">People</Navbar.Brand>

              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
      </div>
      <div class="row p-1" style={{"background-color":"#1E8449", "height":"100px"}}>
      
      </div>
    </>
  )
};

export default Layout;