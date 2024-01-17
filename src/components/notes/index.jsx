import { Button } from '@material-tailwind/react';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Note = () => {
  const [value, setValue] = useState('');

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
  ]
  }

  return (
    <div className='container'>
      <div>
        <Button>save</Button>
      </div>
      <ReactQuill modules={modules} theme="snow" value={value} onChange={setValue} />
    </div>
  )
}

export default Note
