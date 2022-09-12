import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/register.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function loginToAccount(e) {
    e.preventDefault();
    navigate('/dashboard');
  }
  return (
    <main id="register-page">
      <header>
      <h1>Log in to account</h1>
      </header>
      <form onSubmit={loginToAccount}>        
        <label htmlFor="email">
          <p id="first">Email:</p>
        <input type="email" id="email" value={email} onChange={({target: {value}}) => setEmail(value)} />
        </label>
        <label htmlFor="password">
          <p>Password:</p>
          <input type="password" id="password" value={password} onChange={({target: {value}}) => setPassword(value) } />
        </label>
        <button className='submit-btn' type="submit">Log In</button>
      </form>
      <section id="options">
        <NavLink to="/signup">Sign up for account</NavLink>
      </section>
    </main>
  )
}

export default Login