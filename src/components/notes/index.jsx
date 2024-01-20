import { Button, IconButton, Input, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../editor/editor.css"
import { CircularProgress, Skeleton, TextField } from '@mui/material';
import { DocumentTextIcon, ChatBubbleBottomCenterTextIcon, PhotoIcon } from '@heroicons/react/24/solid';
import PsychologyIcon from '@mui/icons-material/Psychology';
import NoteSkeleton from './note-skeleton';

const Note = ({ handleSave, loading, previousData, handleSummarize, handleImageToNote }) => {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [text, setContentText] = useState('');

  const handleOnChange = (content, _, __, editor) => {
    setValue(content);
    setContentText(editor.getText())
  }

  useEffect(() => {
    if (previousData) {
      setValue(JSON.parse(previousData?.data))
      setTitle(previousData?.title)
    }
  }, [previousData])

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

  return (
    <div style={{ pointerEvents: loading ? 'none' : 'all' }} className='container'>
      <div >
        <form className='my-2 flex justify-between' onSubmit={(e) => {
          e.preventDefault();
          handleSave({ data: value, title: title })
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
              <MenuItem onClick={handleImageToNote} className="flex items-center gap-3 text-center">
                <div className='flex items-center'  >
                <PhotoIcon className="h-5 w-5 me-2 text-blue-gray-500" />
                  <Typography className='text-sm font-semibold'>Embbed text from an image</Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
      </div>
      {
        loading ? 
        <NoteSkeleton/> :
      <ReactQuill modules={modules} theme="snow" value={value} onChange={handleOnChange} />
      }
    </div>
  )
}

export default Note
