import React from 'react';
import Button from '../components/button';

const Dashboard = () => {
  return (
    <div>
      <div className = "wrapper">
        <h1 style = {headingStyle}>Chat Rooms</h1> 
        <Button id = 'chat' color= 'skyblue' text = 'View Chats'>

        </Button>
      </div>
    </div>
  )
}
const headingStyle = {
    color: 'lightblue',
    backgroundColor: 'transparent'
}
export default Dashboard