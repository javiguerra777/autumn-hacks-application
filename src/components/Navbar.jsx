import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import HomeButton from './HomeButton';
import UserContext from '../context/context';
import '../styles/navbar.css';

const Navbar = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  function signout() {
    setUser(null);
    navigate('/');
  }
  return (
    <nav id="nav-bar">
      <NavLink className="item link" to="/dashboard">
      <HomeButton id = 'HomeButton' color= "white" text = 'Home'></HomeButton>
      </NavLink>
      <NavLink to="/friends" className="item friends link">Friends</NavLink>
      <button className="sign-out item" type="button" onClick={signout}>Sign out</button>
    </nav>
  )
}

export default Navbar