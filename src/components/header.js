import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from './button'

const Header = () => {
    return (
      <header className='header'>  
        <div className='sign-up-container'>
          <NavLink to="/login">
            <Button id = 'logIn' color= 'skyblue' text = 'Log In' image = "https://i.imgur.com/NSYOpkV.png">
                </Button>
          </NavLink>
          <NavLink to="/signup">
            <Button id = 'signIn' color= 'lightblue' text = 'Sign Up' image = "https://i.imgur.com/2bMJ27i.png"></Button>
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