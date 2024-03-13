import React from 'react'
import './Message.css'
import { Avatar } from '@mui/material'
import { Timestamp } from 'firebase/firestore';

function Message({timestamp, user, message}) {

  if (!message) {
    return null; // Don't render anything if message is null
  }

  const isGif = message.startsWith('https://media.tenor.com');

  let milliseconds;
  if (timestamp instanceof Timestamp) {
    milliseconds = timestamp.toMillis(); // Convert Firestore Timestamp to milliseconds
  } else if (typeof timestamp === 'object' && timestamp._methodName === 'serverTimestamp') {
    // Handle server timestamps
    milliseconds = Date.now(); // Use current local time
  } else if (timestamp && typeof timestamp.toDate === 'function') {
    milliseconds = timestamp.toDate().getTime(); // Convert JavaScript Date to milliseconds
  }

  return (
    <div className='Message'>
      <Avatar src={user.photo} />
      <div className='message__info'>
        <h4>{user.displayName}
            <span className='message__timestamp'>{milliseconds && new Date(milliseconds).toLocaleString()}</span>
        </h4>
        {isGif ? (
          <img className='message_img' src={message} alt='GIF' />
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  )
}

export default Message
