import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  getDocs,
  collection,
  where,
  query,
} from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';
import UserContext from '../context/context';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import '../styles/register.css';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const userCollection = collection(db, 'users');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  let disabled = false;
  if (!email || !password) {
    disabled = true;
  }
  function toggleDisPwd() {
    if (showPwd) {
      setShowPwd(false);
    } else {
      setShowPwd(true);
    }
  }
  async function loginToAccount(e) {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (user) {
        const q = query(
          userCollection,
          where('email', '==', email),
        );
        async function getUserFromDB() {
          let userData = {};
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            userData = { ...doc.data() };
          });
          setUser({ ...userData, loggedIn: true});
        }
        await getUserFromDB();
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
      setPassword('');
    }
  }
  return (
    <main id="register-page">
      {error && <h1 className="login-error">{error}</h1>}
      <header>
      <h1>Log in to account</h1>
      </header>
      <form onSubmit={loginToAccount}>        
        <label htmlFor="email">
          <p id="first">Email:</p>
        <input type="email" id="email" placeholder='johnappleseed@gmail.com' value={email} onChange={({target: {value}}) => setEmail(value)} />
        </label>
        <label htmlFor="password">
          <p>Password:</p>
          <input type={showPwd ? 'text' : 'password'} id="password" placeholder='Password' value={password} onChange={({ target: { value } }) => setPassword(value)} />
          <button className="pwd-btn" type="button" onClick={toggleDisPwd}>{!showPwd ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</button>
        </label>
        <button className='submit-btn' type="submit" disabled={disabled}>Log In</button>
      </form>
      <section id="options">
        <NavLink to="/signup">Sign up for account</NavLink>
      </section>
    </main>
  )
}

export default Login