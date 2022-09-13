import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { nanoid } from 'nanoid';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import '../styles/dashboard.css';

// const rooms = [
//   {
//     "id": 0,
//     "name": "First Room",
//     "description": "Chat #1"
//   },
//   {
//     "id": 1,
//     "name": "Second Room",
//     "description": "Chat #2"
//   },
//   {
//     "id": 2,
//     "name": "Third Room",
//     "description": "Chat #3"
//   },
//   {
//     "id": 3,
//     "name": "Fourth Room",
//     "description": "Chat #4"
//   }
// ]
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
  console.log(rooms);
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