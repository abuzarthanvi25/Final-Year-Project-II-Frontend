import { SquaresPlusIcon } from '@heroicons/react/24/solid'
import { Button, Typography } from '@material-tailwind/react'
import React from 'react'
import ChatRoom from './chat-room'

const ChatHome = ({sender_id, room_id, receiverName, handleBack}) => {
  return (
    <div className='me-5 w-full my-3'>
      <div>
        <ChatRoom handleBack={handleBack} room_id={room_id} sender_id={sender_id} receiverName={receiverName}/>
      </div>
    </div>
  )
}

export default ChatHome
