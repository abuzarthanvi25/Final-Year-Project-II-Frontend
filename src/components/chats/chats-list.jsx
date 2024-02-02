import { Button, Typography } from '@material-tailwind/react'
import React from 'react'
import GroupChatCardSmall from './group-chat-sm'
import ChatSkeleton from './chat-skeleton'
import "./chat-list.css"
import { SquaresPlusIcon } from '@heroicons/react/24/solid'

const ChatsList = ({ chats = [], currentUser, handleChangeRoom = () => { }, handleDeleteChatRoom = () => {}, loading = false, handleOpen = () => {}, onlineUsers = [] }) => {

  const handleGetReceiver = (members) => {
    if(!members || !Array.isArray(members) || !currentUser) return "";

    if(currentUser){
      const receiver = members.filter((member) => member?._id !== currentUser)[0];

      if(receiver) return receiver
    }

    return ""
  }

  const handlePicture = (type, picture, members) => {
    if(!type) return ''

    if(type !== 'Group') {
      return handleGetReceiver(members)?.profile_picture?.url
    }
    
    return picture?.url;
  }

  const handleName = (type, name, members) => {
    if(!type) return ''

    if(type !== 'Group') {
      return handleGetReceiver(members)?.full_name
    }
    
    return name;
  }

  const handleId = (type, members) => {
    if(!type) return ''

    if(type !== 'Group') {
      return handleGetReceiver(members)?._id
    }

    return ''
  }

  const isOnline = (userId) => {
    if(typeof userId !== 'string') return false;

    return onlineUsers.includes(userId);

  }

  const isReceiverOnline = (type, members) => {
    if(typeof type !== 'string' || members.length == 0) return false;

    const receiver_id = handleId(type, members);

    if(!receiver_id) return false

    return isOnline(receiver_id);
  }

  return (
    <div className='w-full px-0 py-3 flex flex-col items-center'>
      <div className='my-2'>
        <div className='w-48'>
          <Button onClick={handleOpen} variant='gradient' fullWidth size='md'>
            <div className='flex items-center justify-evenly'>
              <SquaresPlusIcon className="h-5 w-5" />
              <Typography className='text-md font-semibold'>New Chat</Typography>
            </div>
          </Button>
        </div>
      </div>
      <div className='w-full'>
        <div className='py-2'>
          <Typography className='font-medium text-center' variant='h6'>Chats</Typography>
        </div>
        <div style={{ maxHeight: '70vh' }} className='overflow-y-auto overflow-x-hidden w-full h-full flex items-start flex-col justify-center'>
          {
            loading ? ([1,2,3,4,5,6].map((item) => (<ChatSkeleton key={item}/>))) :
            !!chats.length ?
            chats.map(({ type, name, _id, members, image }, i) => (
              <GroupChatCardSmall isOnline={isReceiverOnline(type, members)} members={members} loading={loading} handleDeleteChatRoom={() => handleDeleteChatRoom(_id)} handleChangeRoom={() => handleChangeRoom(_id)} key={i} previewImage={handlePicture(type, image, members)} name={handleName(type, name, members)} type={type} />
            )) :
            <div className='w-full h-full flex justify-center items-center'><Typography className='text-sm'>No Chats Found</Typography></div>
          }
          
        </div>
      </div>


    </div>
  )
}

export default ChatsList
