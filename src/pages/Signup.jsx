import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function registerAccount(e) {
    e.preventDefault();
    navigate('/dashboard');
  }
  return (
    <main id="register-page">
      <header>
        <h1>Sign up for an account</h1>
      </header>
      <form onSubmit={registerAccount}>
        <label htmlFor="name">
          <p id="first">Name:</p>
        <input type="text" id="email" value={name} onChange={({target: {value}}) => setName(value)} />
        </label>
        <label htmlFor="email">
          <p>Email:</p>
        <input type="email" id="email" value={email} onChange={({target: {value}}) => setEmail(value)} />
        </label>
        <label htmlFor="password">
          <p>Password:</p>
          <input type="password" id="password" value={password} onChange={({target: {value}}) => setPassword(value) } />
        </label>
        <button className='submit-btn' type="submit">Register Account</button>
      </form>
    </main>
  )
}

export default Signup;
