import React from 'react'
import ReactEmoji from 'react-emoji'

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }
  return (
    <>
      {isSentByCurrentUser
        ? (
          <div style={{ display: "flex", justifyContent: "end" }}>
            <p style={{ paddingRight: "10px" }}>{trimmedName}</p>
            <div className="bg-primary text-light rounded p-2">
              <p>{ReactEmoji.emojify(text)}</p>
            </div>
          </div >
        )
        : (
          <div style={{ display: "flex", justifyContent: "start" }}>
            <div className="bg-danger text-dark rounded p-2">
              <p>{ReactEmoji.emojify(text)}</p>
            </div>
            <p style={{ paddingLeft: "10px" }}>{user}</p>
          </div >
        )}
    </>
  )
}

export default Message
