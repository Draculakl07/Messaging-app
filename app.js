// Import required modules
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// Create the Express app and the HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// In-memory data store for messages
let messages = [];

// Serve the static files in the "public" folder
app.use(express.static('public'));

// Handle incoming socket connections
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Send all existing messages to the newly connected user
  socket.emit('messages', messages);

  // Handle incoming messages
  socket.on('sendMessage', (message) => {
    messages.push(message);
    io.emit('newMessage', message); // Broadcast the new message to all connected users
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
