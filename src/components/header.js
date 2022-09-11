import PropTypes from 'prop-types'
import Button from './button'

const Header = (props) => {
    return (
    <header className = 'header'>
        <h1 style = {headingStyle}>{props.title}</h1> 
        <Button color= 'skyblue' text = 'View Chats'>

        </Button>
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