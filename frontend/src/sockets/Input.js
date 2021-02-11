import React from 'react'
import './Chat.css'

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form className="form">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyPress={e => e.key === 13 ? sendMessage(e) : null}
      />
      <button onClick={e => sendMessage(e)}>Send</button>
    </form>
  )
}

export default Input
