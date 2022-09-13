import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { nanoid } from 'nanoid';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import '../styles/dashboard.css';
import { motion } from "framer-motion"


const Dashboard = () => {
  const roomsCollection = collection(db, 'rooms');
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getRooms() {
      const data = await getDocs(roomsCollection);
      setRooms(
        data.docs.map((theDoc) => ({
          ...theDoc.data(),
          id: theDoc.id,
        })),
      );
    }
    getRooms();
  }, []);
  return (
    <main>
      <div className = "wrapper">
        <h1 style={headingStyle}>Chat Rooms</h1> 
        <Navbar />
      </div>
      <div className="room-container" >
        {rooms?.sort((a, b) => a.index -b.index)
          .map(({ name, description, id }) => {
          return (
            <div id="room" key={nanoid()}>
              <h1>{name}</h1>
              <p className= "desc">{description}</p>
              <motion.button className = "roomText" type="button" onClick={()=> navigate(`/chatroom/${id}`)}
              whileHover = {{scale: 1.1}}
              whileTap = {{scale : 0.9}}
              >Enter Room
              </motion.button>
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