import { Button, Input, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../editor/editor.css"
import { CircularProgress, TextField } from '@mui/material';

const Note = ({ handleSave, loading, previousData }) => {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('')

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
            <Input placeholder='Untitled' style={{padding: 0, textAlign:'left', minWidth:'40ch', paddingLeft:'10px'}} onChange={(e) => setTitle(e.target.value)} required defaultValue={title} variant='outlined' />
          </div>
          <Button style={{ minWidth: '120px' }} disabled={loading} type='submit'>
            {
              loading ? <CircularProgress size={20} style={{ color: 'white' }} /> :
                'Save Changes'
            }
          </Button>
        </form>
      </div>
      <ReactQuill modules={modules} theme="snow" value={value} onChange={setValue} />
    </div>
  )
}

export default Note
