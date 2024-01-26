import { Button, Typography } from '@material-tailwind/react'
import React from 'react'
import UserCardSmall from './user-chat-sm'
import GroupChatCardSmall from './group-chat-sm'
import "./chat-list.css"
import { SquaresPlusIcon } from '@heroicons/react/24/solid'
import { Divider } from '@mui/material'

const ChatsList = ({ chats = [], currentUser, handleChangeRoom = () => { } }) => {

  return (
    <div className='w-full px-0 py-3 flex flex-col items-center'>
      <div className='my-2'>
        <div className='w-48'>
          <Button variant='gradient' fullWidth size='md'>
            <div className='flex items-center justify-evenly'>
              <SquaresPlusIcon className="h-5 w-5" />
              <Typography className='text-md font-semibold'>New Chat</Typography>
            </div>
          </Button>
        </div>
      </div>
      <div>
        <div className='py-2'>
          <Typography className='font-medium text-center' variant='h6'>Chats</Typography>
        </div>
        <div style={{ maxHeight: '70vh' }} className='py-1 px-3 overflow-y-auto '>
          {
            !!chats.length &&
            chats.map(({ type, name, _id }, i) => (
              <GroupChatCardSmall handleChangeRoom={() => handleChangeRoom(_id)} key={i} groupPicture='' name={name} type={type} />
            ))
          }
        </div>
      </div>


    </div>
  )
}

export default ChatsList
