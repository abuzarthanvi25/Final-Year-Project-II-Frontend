import { Button, Input, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../editor/editor.css"
import { CircularProgress } from '@mui/material';
import { ChatBubbleBottomCenterTextIcon, PhotoIcon } from '@heroicons/react/24/solid';
import PsychologyIcon from '@mui/icons-material/Psychology';
import NoteSkeleton from './note-skeleton';
import CustomModal from '../modals';
import ImageUpload from './image-upload';
import { io } from "socket.io-client"
import { useParams } from 'react-router-dom';
import Cursors from 'quill-cursors';
import { getRandomColor } from '@/utils/helpers';

const Note = ({ handleSave, loading, previousData, handleSummarize, handleImageToNote, currentUser, members = [] }) => {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [text, setContentText] = useState('');
  const [open, setOpen] = useState(false);
  const [socket, setSocket] = useState(null);
  const [cursorInstance, setCursorInstance] = useState(null)
  const {id: note_id} = useParams()

  const quillRef = useRef();

  const handleGetText = () => {
    const plainText = quillRef.current.editor.getText();
    setContentText(plainText)
  }

  const SAVE_INTERVAL_MS = 3000

  const handleOnChange = (content, _, source, editor) => {
    if (socket == null || source !== "user") return;
    handleCursorChange();
    socket.emit("send-note-changes", content);
  }

  const handleSynchronizeChanges = (socket) => {
    if (socket == null) return;
  
      const handler = synchronizedData => {
          setValue(synchronizedData)
      }
      socket.on("receive-note-changes", handler)
  }

  const handleGetInitialData = (socket) => {
    if (socket == null) return;

    socket.once("load-note-content", ({data, title}) => {
      setValue(data)
      setTitle(title)
      handleGetText()
  })

    socket.emit("get-note-content", note_id);
  }

  useEffect(() => {
    const socket = io("http://localhost:5001/");

    handleGetInitialData(socket)
    handleSynchronizeChanges(socket)

    setSocket(socket)
  }, [])

  const handleCursorChange = () => {
    if(handleGetCursorPostion()){
      socket.emit("send-cursor-position", {user: currentUser?._id, cursor: handleGetCursorPostion()});
    }
  };

  const handleGetCursorPostion = () => {
    if (quillRef.current) {
      const quillInstance = quillRef.current.getEditor();

      const cursorPosition = quillInstance.getSelection();
      
      if(cursorPosition) return cursorPosition

      return null
    }
  }

  useEffect(() => {
    if (quillRef.current) {
      const quillInstance = quillRef.current.getEditor();
      const cursorsModule = new Cursors(quillInstance, { autoRegisterListener: true });
      const cursorsNotInitialized = cursorsModule.cursors()?.length == 0
      if(currentUser && cursorsModule && members.length && cursorsNotInitialized){
        setCursorInstance(cursorsModule)
        members.map(({full_name, _id}) => {
          cursorsModule.createCursor(_id, full_name, getRandomColor());
        })
      }
    }
  }, [quillRef.current])

  useEffect(() => {
    if(!socket) return
    const cursorHandler = ({ user, cursor }) => {
      if (cursorInstance && cursor && user) {
        if (user !== currentUser?._id) {
          cursorInstance.moveCursor(user, cursor);
        }
      }
    };

    socket.on("receive-cursor-position", cursorHandler)
  }, [cursorInstance])

  useEffect(() => {
    handleGetText()
  }, [value])

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["clean"],
      [{ 'direction': 'rtl' }],
      [{ 'align': [] }],
    ]
  }

  const handleOnClose = () => setOpen(false)

  return (
    <div style={{ pointerEvents: loading ? 'none' : 'all' }} className='container'>
      <div >
        <CustomModal open={open} onClose={handleOnClose}>
          <ImageUpload handleCloseModal={handleOnClose} handleImageUpload={(file) => handleImageToNote(value, setValue, file)} />
        </CustomModal>
        <form className='my-2 flex justify-between' onSubmit={(e) => {
          e.preventDefault();
          handleSave({ data: value, title: title })
          if(!socket) return
          socket.emit("send-note-changes", value);
        }}>
          <div className='flex items-center'>
            <Typography className='text-2xl me-3'>Title:</Typography>
            <Input disabled={loading} placeholder='Untitled' style={{padding: 0, textAlign:'left', minWidth:'40ch', paddingLeft:'10px'}} onChange={(e) => setTitle(e.target.value)} required defaultValue={title} variant='outlined' />
          </div>
          <Button style={{ minWidth: '120px' }} disabled={loading} type='submit'>
            {
              loading ? <CircularProgress size={20} style={{ color: 'white' }} /> :
                'Save Changes'
            }
          </Button>
        </form>
      </div>
      <div style={{pointerEvents: loading ? 'none' : 'all'}} className='mb-2'>
      <Menu animate={{mount: { y: 0 },unmount: { y: 25 }}} placement='bottom-start'>
            <div className='flex items-center'>
            <MenuHandler className='flex items-center bg-teal-800 p-2 rounded-md cursor-pointer'>
              <div>
              <PsychologyIcon className="h-5 w-5 me-2 text-white" />
              <Typography className='text-white'>AI Accelerated Notes</Typography>
              </div>
            </MenuHandler>
            </div>
            <MenuList className="w-max border-0">
              {
                !previousData?.is_summarized && previousData &&
              <MenuItem onClick={() => handleSummarize({data:text, title})} className="flex items-center gap-3 text-center">
                <div className='flex items-center'>
                <ChatBubbleBottomCenterTextIcon className="h-5 w-5 me-2 text-blue-gray-500" />
                  <Typography className='text-sm font-semibold'>Summarize Notes</Typography>
                </div>
              </MenuItem>
              }
              <MenuItem onClick={() => setOpen(true)} className="flex items-center gap-3 text-center">
                <div className='flex items-center'  >
                <PhotoIcon className="h-5 w-5 me-2 text-blue-gray-500" />
                  <Typography className='text-sm font-semibold'>Embbed text from image</Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
      </div>
      {
        loading ? 
        <NoteSkeleton/> :
      <ReactQuill ref={quillRef} modules={modules} theme="snow" value={value} onChange={handleOnChange} />
      }
    </div>
  )
}

export default React.memo(Note)
