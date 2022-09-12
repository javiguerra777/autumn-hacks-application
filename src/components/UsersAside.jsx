import React from 'react'

const UsersAside = ({allUsers}) => {
  return (
    <aside id="aside-bar">
      <header>
        <h1>List of all Users</h1>
      </header>
      <section className="users-container">

      {allUsers?.map(({ user, video }) => {
        return (
          <div>
            <p>{user}</p>
          </div>
        )
      })}
      </section>
    </aside>
  )
}

export default UsersAside