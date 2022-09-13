const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const app = express();

const server = http.createServer(app);
const port = process.env.port || 5500;

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }
});

app.get('/', async (req, res) => {
  try {
    res.status(200).json('Welcome to our Autumn Hacks Socket.io Webserver')
  } catch (err) {
    res.status(400).json(err.message);
  }
});



const users = [];
io.on('connection', (socket) => {
  // joins room
  function joinUser(id, username, room, video, audio, videoRef) {
  const pUser = { id, username, room, video, audio, videoRef };
  users.push(pUser);
  return pUser;
  }
  // finds user in the room
  function getCurrentUser(id) {
  return users.find((pUser) => pUser.id === id);
  }
  // removes user from room
  function userDisconnect(id) {
  const index = users.findIndex((pUser) => pUser.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}  
  socket.on('join_room', async ({ username, roomId, video, audio, videoRef }) => {
    const pUser = await joinUser(socket.id, username, roomId, video, audio, videoRef);
    console.log('all users:', users);
    const usersInRoom = users.filter((user) => {
      return user.room === roomId;
    });
    socket.join(pUser.room);
    io.to(pUser.room).emit('all_current_users', usersInRoom)
  });

  socket.on('leave_room', async (room) => {
    socket.leave(room);
    await userDisconnect(socket.id)
    const updatedUsersInRoom = users.filter((user) => {
      return user.room === room;
    });
    io.to(room).emit('new_current_users', updatedUsersInRoom);
  });
  socket.on('disconnect', async (room) => {
    socket.leave(room);
    await userDisconnect(socket.id);
    const updatedUsersInRoom = users.filter((user) => {
      return user.room === room;
    });
    io.to(room).emit('disconnected_users', updatedUsersInRoom);
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
