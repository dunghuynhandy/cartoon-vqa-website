import Navbar from './Navbar';
import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import logo from '../logo.png';
const Header = () => {

  return (
    <div>
      <div class="row p-1 d-flex justify-content-center" style={{"background-color":"#1E8449"}}>
        <div class="col-4 px-5"> <img src={logo}  alt="logo" style={{width:"100%", height:"100%"}} /></div>
      </div>
      <header class="row">
        <div  className="nav-area" style={{"background-color":"#186A3B"}}>

          <Navbar />

        </div>

      </header>

    </div>

  );
};

export default Header;