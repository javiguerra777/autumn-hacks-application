import React from 'react';
import { nanoid } from 'nanoid';

const Aside = ({messages, sendMessage, message, setMessage }) => {
  return (
    <aside id="aside-bar">
      <header className="">
        <h1>Messages</h1>
      </header>
        <div className="message-container" >
          {messages?.map(({name, message}) => {
            return (
              <div className="user-msg" key={nanoid()}>
                <h4 className="text-msg">{name}</h4>
                <p className="text-msg">{message}</p>
              </div>
            )
          })}
        </div>
        <form className='msg-form' onSubmit={sendMessage}>
          <label htmlFor="message">
            <input type="text" id="message" placeholder="Message..." value={message} onChange={(e)=> setMessage(e.target.value)} />
          </label>
        </form>
      </aside>
  )
}

export default Aside;
