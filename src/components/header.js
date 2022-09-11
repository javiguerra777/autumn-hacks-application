import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from './button'

const Header = () => {
    return (
      <header className='header'>  
        <div className='sign-up-container'>
          <NavLink to="/login">
            <Button id = 'logIn' color= 'skyblue' text = 'Log In'></Button>
          </NavLink>
          <NavLink to="/signup">
            <Button id = 'signIn' color= 'white' text = 'Sign Up'></Button>
          </NavLink>
        
        </div>
    </header>
    )
}

Header.defaultProps = {
    title: 'Chat Rooms',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header

// background-image: url('https://i.imgur.com/NQXrEh8.jpeg');