import './Chat.css'
import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';
let socket;


const Chat = ({ location, name, room }) => {
  // const [name, setName] = useState("");
  // const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:5000';

  const [toggleForm, setToggleForm] = useState(true);

  useEffect(() => {
    // CREATE NAME/ROOM & ENTER ROOM
    // const { name, room } = queryString.parse(location.search);
    // CREATE USER SOCKET
    socket = io(ENDPOINT);

    // setName(name);
    // setRoom(room);
    console.log(socket);

    // USER IS ADDED TO LIST OF USERS, ELSE ERRORS.
    // ADMIN IS MADE AWARE OF THE ADDITION
    // EVERYBODY ELSE IN ROOM IS MADE AWARE OF THE ADDITION
    socket.emit('join', { name, room }, () => 'empty');

    //disconnect
    return () => {
      socket.disconnect(true);
    }
  }, [ENDPOINT])

  //location.search

  // SHOW ALL MESSAGES IN THE ROOM UPON ENTERING
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages]);

  const sendMessage = e => {
    e.preventDefault();

    // IF USER SENT A MESSAGE, SEND MESSAGE TO USERS IN CURRENT ROOM
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }


  function togglePopUp() {
    if (toggleForm) {
      setToggleForm(false)
    } else {
      setToggleForm(true)
    }
  }

  return (
    <div>
      <button className="open-button" onClick={() => togglePopUp()}>Chat</button>
      <div className={toggleForm ? "chat-popup form-container" : "chat-popdown"}>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        <button className="btn cancel" onClick={() => setToggleForm(false)}>Close</button>
      </div>
    </div >
  )
}

export default Chat
