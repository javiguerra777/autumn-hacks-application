import React, { useRef, useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineVideoCamera, AiOutlineAudio, AiOutlineAudioMuted } from 'react-icons/ai';
import { BiVideoOff } from 'react-icons/bi';
import { BsChatLeft } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import Aside from '../components/Aside';
import UsersAside from '../components/UsersAside';
import UserContext from '../context/context';
import { socket } from '../App';
import '../styles/home.css';
import '../styles/sliders.css';
import { motion } from "framer-motion"


const ChatRoom = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [allUsers, setAllUsers] = useState([]);
  const [chat, setChat] = useState(true);
  const [users, setUsers] = useState(false);
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [mystream, setmystream] = useState();
  const videoRef = useRef();
  const navigate = useNavigate();
  
  const playVideo = () => {
    mystream.getTracks().forEach(function (track) {
                if (track.readyState === "live" && 
                    track.kind === "video") {
                  track.enabled = true;
                }
    });
  }
  const stopVideo = () => {
    mystream.getTracks().forEach(function (track) {
                if (track.readyState === "live" && 
                    track.kind === "video") {
                  track.enabled = false;
                }
    });
  }
  const playAudio = () => {
     mystream.getTracks().forEach(function (track) {
                if (track.readyState === "live" && 
                    track.kind === "audio") {
                    track.enabled = true;
                }
            });
  }
  const stopAudio = () => {
    mystream.getTracks().forEach(function (track) {
                if (track.readyState === "live" && 
                    track.kind === "audio") {
                    track.enabled = false;
                }
            });
  }
  const loadVideo = () => {
      navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
                videoRef.current.autoplay = true;
                videoRef.current.muted = false;
                setmystream(stream);
            });
  }
  // useEffects
  useEffect(() => {
    async function loadRoom() {
      await loadVideo();
      await socket.emit('join_room', {
        username: user.username,
        roomId: id,
        video,
        audio,
        videoRef: mystream
     })
    }
    loadRoom();
    return () => {
      socket.emit('leave_room', id);
    }
  }, []);
  // users join and array gets updated
  useEffect(() => {
    socket.on('all_current_users', (data) => {
      setAllUsers(data);
    })
  }, []);
  // user leaves and array is updated
  useEffect(() => {
    socket.on('new_current_users', (data) => {
      setAllUsers(data);
    })
  }, []);
  useEffect(() => {
    socket.on('new_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);
  // functions
  function sendMessage(e) {
    e.preventDefault();
    const sentMessage = {
      name: user.username,
      email: user.email,
      userId: user.userId,
      message,
    }
    socket.emit('send_message', sentMessage)
    setMessage('');
  }
  function displayChat() {
    setChat(true);
    setUsers(false)
  }
  function displayUsers() {
    setUsers(true);
    setChat(false);
  }
  function toggleAudio() {
    if (audio) {
      setAudio(false);
      stopAudio();
    } else {
      setAudio(true);
      playAudio();
    }
  }
  function toggleVideo() {
    if (video) {
      setVideo(false);
      stopVideo();
    } else {
      setVideo(true);
      playVideo();
    }
  }
return (
  <main className="chatroom">
    <section className='main-content'>
      {chat && !users ? <Aside messages={messages} sendMessage={sendMessage} message={message} setMessage={setMessage} /> : <UsersAside allUsers={allUsers} />}
      {video ? <video id="videoElement" ref={videoRef} /> : <video id="videoElement" ref={videoRef} />
 }
      <div className="btn-container">
        <motion.button className = "dbButton"onClick={() => navigate('/dashboard')} whileHover = {{scale: 1.1}}
      whileTap = {{scale : 0.9}}>Return to Dashboard</motion.button>
      </div>
    </section>
    <footer id="footer-options">
      <div className="chat-options">
        <button type="button" className="button" onClick={displayChat}><BsChatLeft /></button>
        <button type="button" className="button" onClick={displayUsers}><FiUsers /></button>
      </div>
      <div className="audio-options">
        <button type="button" className="button video" onClick={toggleVideo}>{video ? <AiOutlineVideoCamera/> : <BiVideoOff/> }</button>
        <button type="button" className="button audio" onClick={toggleAudio}>{audio ? <AiOutlineAudio/> : <AiOutlineAudioMuted/>} </button>
      </div>
      <div/>
    </footer>
  </main>
)};

export default ChatRoom;