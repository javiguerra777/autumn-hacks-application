import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, where, query, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import UserContext from '../context/context';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const Signup = () => {
  const { setUser } = useContext(UserContext);
  const userCollection = collection(db, 'users');
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  let disabled = false;
  if (password.length < 10) {
    disabled = true;
  }
  function toggleDisPwd() {
    if (showPwd) {
      setShowPwd(false);
    } else {
      setShowPwd(true);
    }
  }
  async function registerAccount(e) {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password).then((cred) => {
        return addDoc(userCollection, {
          userId: cred.user.uid,
          email,
          username: name,
        })
      })
      if (user) {
        const q = query(
          userCollection,
          where('email', '==', email)
        )
        async function getUserFromDB() {
          let userData = {};
          const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              userData = { ...doc.data() };
            });
          setUser({...userData, loggedIn: true});
        }
        await getUserFromDB();
        navigate('/dashboard');
      };
    } catch (err) {
      setError(err.message)
    }
  }
  return (
    <main id="register-page">
      {error && <h1 className="login-error">{error}</h1>}
      <header>
        <h1>Sign up for an account</h1>
      </header>
      <form onSubmit={registerAccount}>
        <label htmlFor="name">
          <p id="first">Username:</p>
        <input type="text" id="name" placeholder='ex:Johnappleseed777' value={name} onChange={({target: {value}}) => setName(value)} />
        </label>
        <label htmlFor="email">
          <p>Email:</p>
        <input type="email" id="email" placeholder='johnappleseed@gmail.com' value={email} onChange={({target: {value}}) => setEmail(value)} />
        </label>
        <label htmlFor="password">
          <p>Password:</p>
          <input type="password" id="password" placeholder="Password must be 10 characters" value={password} onChange={({ target: { value } }) => setPassword(value)} />
          <button className="pwd-btn" type="button" onClick={toggleDisPwd}>{!showPwd ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</button>
        </label>
        <button className='submit-btn' type="submit" disabled={disabled}>Register Account</button>
      </form>
    </main>
  )
}

export default Signup;
