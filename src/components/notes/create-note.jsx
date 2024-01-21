import React, { useState } from 'react'
import Note from './index'
import { useLocation, useNavigate } from 'react-router-dom'
import { get } from 'lodash';
import { createNoteRequest, imageToNoteRequest } from '@/store/reducers/note-reducer';
import { unwrapResult } from '@reduxjs/toolkit';
import { showFaliureToast } from '@/utils/toast-helpers';
import { useDispatch } from 'react-redux';

const CreateNote = () => {
    const {state} = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)

    const course_id = get(state, 'course_id', null);
    const token = get(state, 'token', null);

    const handleAddNote = (notesContent) => {
        const body = {
            title: notesContent?.title,
            data: JSON.stringify(notesContent?.data),
            course_id
        }
        if (!token || !course_id) return;

        dispatch(createNoteRequest({ token, body }))
          .then(unwrapResult)
          .then(() => {
            navigate(`/dashboard/courses/${course_id}`)
            setLoading(false)
          })
          .catch((err) => {
            showFaliureToast(err?.response?.data?.message)
            setLoading(false)
          })

    }

    const handleImageToNote = (editorValue, setEditorValue, image) => {
      try {
        if(!image) return;
  
        setLoading(true);
        const formData = new FormData();
        formData.append("image", image);
        const body = formData;
  
        dispatch(imageToNoteRequest({ token, body }))
        .then(unwrapResult)
        .then((response) => {
          setLoading(false)
          if(typeof response?.data?.data == 'string'){
            setEditorValue(editorValue + JSON.parse(response?.data?.data))
          }
        })
        .catch((err) => {
          showFaliureToast(err?.response?.data?.error)
          setLoading(false)
        })
        
      } catch (error) {
        console.log(`error at handleImageToNote`, error);
      }
    }

  return (
    <div>
      <Note handleImageToNote={handleImageToNote} loading={loading} handleSave={handleAddNote}/>
    </div>
  )
}

export default CreateNote
