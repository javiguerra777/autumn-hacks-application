import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';
import { motion } from "framer-motion"


const ChatRoom = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
        console.log(video);
      })
      .catch(err => {
        console.error("error:", err);
      });
  };
  useEffect(() => {
    getVideo();
  }, []);
return (
  <main className="chatroom">
      <header>
      <h1>Show your video</h1>
      <motion.button className = "dbButton"onClick={() => navigate('/dashboard')}
      whileHover = {{scale: 1.1}}
      whileTap = {{scale : 0.9}}
      >Return to Dashboard
      </motion.button>
      </header>
    <video id="videoElement" ref={videoRef} />
    <aside></aside>
    <footer></footer>
  </main>
)};

export default ChatRoom;