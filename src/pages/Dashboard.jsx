import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { nanoid } from 'nanoid';
import '../styles/dashboard.css';

const rooms = [
  {
    "id": 0,
    "name": "name",
    "description": "first group chat"
  },
  {
    "id": 1,
    "name": "second room",
    "description": "second group chat"
  },
  {
    "id": 2,
    "name": "third room",
    "description": "third group chat"
  },
  {
    "id": 3,
    "name": "fourth room",
    "description": "fourth group chat"
  },
  {
    "id": 4,
    "name": "fifth room",
    "description": "fifth group chat"
  },
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
              <p>{description}</p>
              <button type="button" onClick={()=> navigate(`/chatroom/${id}`)}>click me</button>
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