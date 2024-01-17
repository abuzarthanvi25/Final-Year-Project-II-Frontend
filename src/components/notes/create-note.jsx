import React, { useState } from 'react'
import Note from './index'
import { useLocation, useNavigate } from 'react-router-dom'
import { get } from 'lodash';
import { createNoteRequest } from '@/store/reducers/note-reducer';
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

  return (
    <div>
      <Note loading={loading} handleSave={handleAddNote}/>
    </div>
  )
}

export default CreateNote
