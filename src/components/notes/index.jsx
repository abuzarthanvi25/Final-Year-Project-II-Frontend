import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../editor/editor.css"
import { CircularProgress } from '@mui/material';

const Note = ({ handleSave, loading, previousData }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (previousData) {
      setValue(JSON.parse(previousData?.data))
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
      <div className='my-2'>
        <Button style={{minWidth:'120px'}} disabled={loading} onClick={() => handleSave({ data: value, title: previousData?.title })}>
          {
            loading ? <CircularProgress size={20} style={{ color: 'white' }} /> :
              'Save Changes'
          }
        </Button>
      </div>
      <ReactQuill modules={modules} theme="snow" value={value} onChange={setValue} />
    </div>
  )
}

export default Note
