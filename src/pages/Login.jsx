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
import '../styles/register.css';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const userCollection = collection(db, 'users');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let disabled = false;
  if (!email || !password) {
    disabled = true;
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
      console.log(err);
    }
  }
  return (
    <main id="register-page">
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
          <input type="password" id="password" placeholder='Password' value={password} onChange={({target: {value}}) => setPassword(value) } />
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