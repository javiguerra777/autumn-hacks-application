import React from 'react';
import { nanoid } from 'nanoid';
import { AiOutlineVideoCamera, AiOutlineAudio, AiOutlineAudioMuted } from 'react-icons/ai';
import { BiVideoOff } from 'react-icons/bi';

const UsersAside = ({ allUsers }) => {
  console.log(allUsers)
  return (
    <aside id="aside-bar">
      <header className="aside-header">
        <h1 id="header-h1">List of all Users</h1>
      </header>
      <section className="users-container">

      {allUsers?.map(({ username, video, audio }) => {
        return (
          <div className="all-users-ctn" key={nanoid()}>
            <p>{username}</p>
            <video className="user-video" />
            <footer id="user-disp-footer">
              {video ? <AiOutlineVideoCamera size="25px" /> : <BiVideoOff size="25px" />}
              {audio ? <AiOutlineAudio size="25px" /> : <AiOutlineAudioMuted size="25px" />}
            </footer>
          </div>
        )
      })}
      </section>
    </aside>
  )
}

export default UsersAside