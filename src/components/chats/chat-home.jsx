import { SquaresPlusIcon } from '@heroicons/react/24/solid'
import { Button, Typography } from '@material-tailwind/react'
import React from 'react'
import ChatRoom from './chat-room'
import { get } from 'lodash'

const ChatHome = ({sender_id, room_id, chatDetails, handleBack}) => {

  const receiverName = get(chatDetails, 'name', '');
  const receiverImg = get(chatDetails, 'picture', '')

  return (
    <div className='me-3 w-full my-3'>
        <ChatRoom receiverImg={receiverImg} handleBack={handleBack} room_id={room_id} sender_id={sender_id} receiverName={receiverName}/>
    </div>
  )
}

export default ChatHome
