import React from 'react';
import { nanoid } from 'nanoid';

const UsersAside = ({ allUsers }) => {
  console.log(allUsers)
  return (
    <aside id="aside-bar">
      <header>
        <h1>List of all Users</h1>
      </header>
      <section className="users-container">

      {allUsers?.map(({ username, video }) => {
        return (
          <div key={nanoid()}>
            <p>{username}</p>
          </div>
        )
      })}
      </section>
    </aside>
  )
}

export default UsersAside