const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
  },
});

let list = [];

io.on('connection', (socket) => {
  console.log('User Connected: ', socket.id);

  socket.emit('listUpdated', list);

  socket.on('message', (data) => {
    list.push(data);
    io.emit('counterUpdated', list);
  });
});

server.listen(7000, () => {
  console.log('Socket server listening on port 7000');
});