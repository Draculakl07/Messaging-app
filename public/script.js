// Establish a socket connection with the server
const socket = io();

// Function to display a new message in the container
function displayMessage(message) {
  const messageContainer = document.getElementById('message-container');
  const newMessageElement = document.createElement('div');
  newMessageElement.innerText = message;
  messageContainer.appendChild(newMessageElement);
}

// Event listener for the "Send" button
document.getElementById('send-button').addEventListener('click', () => {
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();

  if (message) {
    socket.emit('sendMessage', message);
    messageInput.value = '';
  }
});

// Event listener for the "Enter" key in the message input field
document.getElementById('message-input').addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    document.getElementById('send-button').click();
  }
});

// Receive and display new messages from the server
socket.on('newMessage', (message) => {
  displayMessage(message);
});

// Receive and display all existing messages from the server
socket.on('messages', (messages) => {
  messages.forEach((message) => {
    displayMessage(message);
  });
});
