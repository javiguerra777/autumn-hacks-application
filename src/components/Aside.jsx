import React from 'react';
import { nanoid } from 'nanoid';

const Aside = ({messages, sendMessage, message, setMessage }) => {
  return (
    <aside id="aside-bar">
        <div className="message-container" >
          {messages?.map(({name, message}) => {
            return (
              <div key={nanoid()}>
                <h1>{name}</h1>
                <p>{message}</p>
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
