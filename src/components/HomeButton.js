import React from "react";
import { useNavigate } from "react-router-dom";
const HomeButton = ({ text, id }) => {
  const navigate = useNavigate();
  function navToDashboard() {
    navigate('/dashboard');
  }
  return (
  <button id= {id} className = 'homebutton' type="button" onClick={navToDashboard}>
    <img src = "https://i.imgur.com/YqWrBFH.png" alt = "home"></img>
    <p>{text}</p>
    </button>
  )
}

export default HomeButton