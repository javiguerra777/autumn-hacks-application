import React, { useRef, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineVideoCamera, AiOutlineAudio, AiOutlineAudioMuted } from 'react-icons/ai';
import { BiVideoOff } from 'react-icons/bi';
import { BsChatLeft } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import Aside from '../components/Aside';
import UsersAside from '../components/UsersAside';
import UserContext from '../context/context';
import '../styles/home.css';
import '../styles/sliders.css';

const ChatRoom = () => {
  const { user } = useContext(UserContext);
  const [chat, setChat] = useState(true);
  const [users, setUsers] = useState(false);
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [mystream, setmystream] = useState(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  
  const playVideo = () => {
    navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
              videoRef.current.autoplay = true;
              if (audio) {
                videoRef.current.muted = false;
              }
                setmystream(stream);
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
  useEffect(() => {
    playVideo();
  }, []);
  function sendMessage(e) {
    e.preventDefault();
    setMessages((prev) => [...prev, {
      name: user.name,
      email: user.email,
      userId: user.userId,
      message
    }]);
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
      setAudio(true);
      playVideo();
    }
  }
return (
  <main className="chatroom">
    <section className='main-content'>
      {chat && !users ? <Aside messages={messages} sendMessage={sendMessage} message={message} setMessage={setMessage} /> : <UsersAside />}
      {video ? <video id="videoElement" ref={videoRef} /> : <video id="videoElement" ref={videoRef} />
 }
      <div className="btn-container">
        <button className = "dbButton"onClick={() => navigate('/dashboard')}>Return to Dashboard</button>
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