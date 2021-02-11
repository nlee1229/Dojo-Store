import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../sockets/Chat.js'

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [toggleForm, setToggleForm] = useState(false);


  return (
    <div>
      <div>
        <button className="open-button" onClick={() => setToggleForm(true)}>Chat</button>
        <div className={toggleForm ? "chat-popup form-container" : "chat-popdown"}>
          <h2>Ask a question!</h2>
          <div>
            <input
              placeholder="Your Name"
              type="text"
              onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <input
              placeholder="Question"
              type="text"
              onChange={e => setRoom(e.target.value)} />
          </div>
          <Link
            onClick={e => (!name || !room) ? e.preventDefault() : null}
            to={`/?name=${name}&room=${room}`}>
            <button className="signin-button" type="submit">Submit</button>
          </Link>
          <button className="btn cancel" onClick={() => setToggleForm(false)}>Close</button>
        </div>
        {/* <button className="btn cancel" onClick={() => setToggleForm(false)}>Close</button> */}
      </div>
    </div >



  )
}

export default Join
