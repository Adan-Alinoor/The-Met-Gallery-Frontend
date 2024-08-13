import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './Messaging.css';

const socket = io.connect('http://localhost:5555');

const Messaging = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentChat, setCurrentChat] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    axios.get('/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });

    axios.get('/messages')
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });

    socket.on('new_message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socket.off('new_message');
    };
  }, []);

  const handleUserClick = (user) => {
    setCurrentUser(user);
    const chat = messages.filter(msg =>
      (msg.sender === user.id && msg.recipient === 1) ||
      (msg.sender === 1 && msg.recipient === user.id)
    );
    setCurrentChat(chat);
  };

  const handleSendMessage = () => {
    const messageData = {
      recipient_id: currentUser.id,
      message: newMessage,
    };

    axios.post('/messages', messageData)
      .then(response => {
        setNewMessage('');
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };

  return (
    <div className="chat-container">
      <div className="user-list">
        {users.map(user => (
          <div
            key={user.id}
            onClick={() => handleUserClick(user)}
            className={user.id === currentUser?.id ? 'active' : ''}
          >
            {user.name}
          </div>
        ))}
      </div>

      <div className="message-area">
        <div className="messages">
          {currentChat.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === 1 ? 'sent' : 'received'}`}
            >
              {msg.message}
            </div>
          ))}
        </div>

        <div className="message-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
