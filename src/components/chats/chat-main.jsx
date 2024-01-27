import React, { useEffect, useState } from 'react'
import ChatsList from './chats-list'
import ChatHome from './chat-home'
import { deleteChatRequest, deleteMessageRequest, getChatsRequest } from '@/store/reducers/chat-reducer'
import { unwrapResult } from '@reduxjs/toolkit'
import { showFaliureToast } from '@/utils/toast-helpers'
import { useDispatch, useSelector } from 'react-redux'
import { get } from 'lodash'

const ChatMain = () => {
  const [loading, setLoading] = useState(false);
  const [chatsLocal, setChatsLocal] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [chatDetails, setChatDetails] = useState({name: '', picture: ''});

  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.auth);
  const { allChatRooms } = useSelector((state) => state.chats);

  const token = get(userDetails, "token", null);
  const userId = get(userDetails, "user._id", null);

  const handleGetChats = () => {
    try {
      if (!token) return;

      setLoading(true)
      dispatch(getChatsRequest({ token }))
        .then(unwrapResult)
        .then(() => {
          setLoading(false)
        })
        .catch((err) => {
          showFaliureToast(err?.response?.data?.message)
          setLoading(false)
        })

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => handleGetChats(), []);

  useEffect(() => {
    if (allChatRooms) {
      setChatsLocal(allChatRooms)
    }
  }, [allChatRooms])

  const handleChangeRoom = (room_id) => {
    setCurrentRoom(room_id);
  }
  
  const handleBack = () => setCurrentRoom(null)

  useEffect(() => {
    handleGetReceiver()
  }, [currentRoom])

  const handleGetReceiver = () => {
    const currentChat = chatsLocal.find((chatRoom) => chatRoom?._id == currentRoom);
    
    if(currentChat){
      const type = get(currentChat, "type", '');
      
      if(type == 'Personal'){
        const members = get(currentChat, "members", []);
        const receiver = members.filter((member) => member?._id !== userId)
  
        if(receiver[0]){
          setChatDetails({name: receiver[0].full_name, picture: receiver[0].profile_picture?.url})
        }
      }else{
        const name = get(currentChat, "name", '');
        const image = get(currentChat, "image.url", '');
        setChatDetails({name: name, picture: image});
      }
    }else{
      setChatDetails({name: '', picture: ''});
    }
  }

  const handleDeleteChatRoom = (chat_room_id) => {
    try {
      if (!token || !chat_room_id) return;

      setLoading(true)
      dispatch(deleteChatRequest({ token, chat_room_id }))
        .then(unwrapResult)
        .then(() => {
          handleBack();
          handleGetChats();
          setLoading(false);
        })
        .catch((err) => {
          showFaliureToast(err?.response?.data?.message)
          setLoading(false)
        })

    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteMessage = (message_id, cb) => {
    try {
      if (!token || !message_id) return;

      dispatch(deleteMessageRequest({ token, message_id }))
        .then(unwrapResult)
        .then(() => {
          if(typeof cb == 'function') cb();
        })
        .catch((err) => {
          showFaliureToast(err?.response?.data?.message)
        })

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='flex bg-white rounded-xl'>
      <ChatsList loading={loading} handleDeleteChatRoom={handleDeleteChatRoom} handleChangeRoom={handleChangeRoom} currentUser={userId} chats={chatsLocal ?? []}/>
      <ChatHome handleDeleteMessage={handleDeleteMessage} chatDetails={chatDetails} sender_id={userId} handleBack={handleBack} room_id={currentRoom} />
    </div>
  )
}

export default ChatMain
