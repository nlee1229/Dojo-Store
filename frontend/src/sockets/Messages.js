import React, { useEffect, useRef } from 'react'
import Message from './Message.js'

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

const Messages = ({ messages, name }) => {

  const allMessages = messages.map((message, i) =>
    <div key={i}><Message message={message} name={name} /></div>
  )


  return (
    <div style={{ overflowY: "auto", height: "150px" }}>
      {allMessages}
      <AlwaysScrollToBottom />
    </div>
  )
}

export default Messages
