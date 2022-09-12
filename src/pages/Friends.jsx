import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/Friends.css';

const Friends = () => {
  return (
    <header>
      <div class = "navigation">
        <Navbar />
      </div>
      <div className='title'>
        Friends
      </div>
      
      <div class = "friend-wrap">
        <button type = "button" className='add-friend'>Add Friend</button>
      <p class = "friend-area">
        <p><label className='labels'>Name</label>
        <input type="text" /></p>
        <p><label className='labels'>Email </label>
        <input type="email" /></p>
        <p><label className='labels'>Phone</label>
        <input type="number" /></p>
        
        </p>
        <p class = "show-friend"></p>
      </div>
    </header>

  )
}

export default Friends