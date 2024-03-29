import { SquaresPlusIcon } from '@heroicons/react/24/solid'
import { Button, Typography } from '@material-tailwind/react'
import React from 'react'
import ChatRoom from './chat-room'
import { get } from 'lodash'

const ChatHome = ({sender_id, room_id, chatDetails, handleBack, handleDeleteMessage}) => {

  const receiverName = get(chatDetails, 'name', '');
  const receiverImg = get(chatDetails, 'picture', '')
  const receiver_id = get(chatDetails, 'receiver_id', '')

  return (
    <div className='me-3 w-full my-3'>
        <ChatRoom receiver_id={receiver_id} handleDeleteMessage={handleDeleteMessage} receiverImg={receiverImg} handleBack={handleBack} room_id={room_id} sender_id={sender_id} receiverName={receiverName}/>
    </div>
  )
}

export default ChatHome
