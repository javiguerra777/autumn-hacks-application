const Button = ({color, text, id }) => {
    return <button id= {id} style ={{backgroundColor: color}} className = 'btn' type="button">{text}</button>
}

export default Button