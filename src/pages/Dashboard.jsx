import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { nanoid } from 'nanoid';
import '../styles/dashboard.css';

const rooms = [
  {
    "id": 0,
    "name": "First Room",
    "description": "Chat #1"
  },
  {
    "id": 1,
    "name": "Second Room",
    "description": "Chat #2"
  },
  {
    "id": 2,
    "name": "Third Room",
    "description": "Chat #3"
  },
  {
    "id": 3,
    "name": "Fourth Room",
    "description": "Chat #4"
  }
]
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <main>
      <div className = "wrapper">
        <h1 style={headingStyle}>Chat Rooms</h1> 
        <Navbar />
      </div>
      <div className="room-container" >
        {rooms.map(({name, description, id}) => {
          return (
            <div id="room" key={nanoid()}>
              <h1>{name}</h1>
              <p className= "desc">{description}</p>
              <button className = "roomText" type="button" onClick={()=> navigate(`/chatroom/${id}`)}>Enter Room</button>
            </div>
          )
        })}
      </div>
    </main>
  )
}
const headingStyle = {
    color: 'lightblue',
    backgroundColor: 'transparent'
}
export default Dashboard