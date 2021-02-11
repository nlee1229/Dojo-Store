import React from 'react'
import closeIcon from '../socketIcons/closeIcon.png'



const InfoBar = ({ room }) => {
  return (
    <div style={{ display: "flex", justifyContent: 'space-around', alignItems: "center" }} className="bg-info">
      <h3>{room}</h3>
      {/* Keep this as an anchor tag. This will allow for socket to completely disconnect.*/}
      <a href="/"><img src={closeIcon} alt="close" /></a>
    </div>
  )
}

export default InfoBar
