import PropTypes from 'prop-types'
import Button from './button'
import HomeButton from './HomeButton'

const Header = (props) => {
    return (
    <header className = 'header'>
        <div class = "wrapper">
        <h1 style = {headingStyle}>{props.title}</h1> 
        <Button id = 'chat' color= 'skyblue' text = 'View Chats'>

        </Button>
        </div>
        
        <div class = 'sign-up-container'>
        <Button id = 'logIn' color= 'skyblue' text = 'Log In' ></Button>
        <Button id = 'signIn' color= 'white' text = 'Sign Up'></Button>
        <HomeButton id = 'HomeButton' color= "white" text = 'Home'></HomeButton>
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

const headingStyle = {
    color: 'lightblue',
    backgroundColor: 'transparent'
}

export default Header

// background-image: url('https://i.imgur.com/NQXrEh8.jpeg');