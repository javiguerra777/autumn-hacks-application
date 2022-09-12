import React from "react";
import { motion } from "framer-motion"

import { useNavigate } from "react-router-dom";
const HomeButton = ({ text, id }) => {
  const navigate = useNavigate();
  function navToDashboard() {
    navigate('/dashboard');
  }
  return (
  <motion.button id= {id} className = 'homebutton' type="button" onClick={navToDashboard} 
  whileHover = {{scale: 1.1}}
  whileTap = {{scale : 0.9}}
  >
    <img src = "https://i.imgur.com/YqWrBFH.png" alt = "home"></img>
    <p>{text}</p>
    </motion.button>
  )
}

export default HomeButton