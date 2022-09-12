const Button = ({color, text, id, image}) => {
    return <button id= {id} 
    style ={{backgroundColor: color}}
    className = 'btn' type="button">
        <img src = {image}></img>
    <p>{text}</p>
    </button>
}

export default Button