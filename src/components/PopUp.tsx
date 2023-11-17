import React from 'react'
import '../styles/PopUp.css';
const PopUp = ({ isVisible, onClose, message, messageTitle }: any) => {
    if( !isVisible ) return null;
  return (
    <div className="container">
      <div className="box">
        <h1 className="header">
        {messageTitle}
        </h1>
  
        <div className="line"></div>
        <ol className="content">
          <p>{message}</p>
        </ol>
        <button className="closeButton" onClick={() => onClose()}>
          <p>Continue</p>
        </button>
      </div>
    </div>  
  )
}

export default PopUp