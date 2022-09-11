const HomeButton = ({text, id}) => {
  return (
  <button id= {id} className = 'homebutton'>
    <img src = "https://i.imgur.com/YqWrBFH.png" alt = "home"></img>
    <p>{text}</p>
    </button>
  )
}

export default HomeButton