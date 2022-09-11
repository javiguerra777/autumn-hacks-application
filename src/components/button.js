const Button = ({color, text, id}) => {
    return <button id= {id} style ={{backgroundColor: color}} className = 'btn' >{text}</button>
}

export default Button