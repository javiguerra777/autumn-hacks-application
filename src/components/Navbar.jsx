import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import HomeButton from './HomeButton';
import '../styles/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  function signout() {
    navigate('/');
  }
  return (
    <nav id="nav-bar">
      <NavLink className="item" to="/dashboard">
      <HomeButton id = 'HomeButton' color= "white" text = 'Home'></HomeButton>
      </NavLink>
      <NavLink to="/friends" className="item friends">Friends</NavLink>
      <button className="item" type="button" onClick={signout}>Sign out</button>
    </nav>
  )
}

export default Navbar