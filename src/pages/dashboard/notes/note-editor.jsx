import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Note from '../../../components/notes/index'
import React, { useEffect, useState } from 'react'
import { get } from 'lodash';
import { getNoteDetailsRequest, summarizeNoteRequest, updateNoteRequest } from '@/store/reducers/note-reducer';
import { unwrapResult } from '@reduxjs/toolkit';
import { showFaliureToast } from '@/utils/toast-helpers';
import { useDispatch } from 'react-redux';

const NoteEditor = () => {
  const { state } = useLocation();
  const {id: note_id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const [currentNoteDetails, setCurrentNoteDetails] = useState(null)

  const course_id = get(state, 'course_id', null);
  const course_title = get(state, 'course_title', null);
  const token = get(state, 'token', null);

  const handleGetNoteDetails = () => {
    try {
      if (!token || !note_id) return;

      dispatch(getNoteDetailsRequest({ token, note_id }))
        .then(unwrapResult)
        .then((response) => {
          setCurrentNoteDetails(response?.data?.data?.note)
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

  useEffect(() => handleGetNoteDetails(), [])

  const handleEditNote = (updatedContent) => {
    const body = {
      title: updatedContent?.title,
      data: JSON.stringify(updatedContent?.data),
      course_id
    }

    if (!token || !course_id) return;

    setLoading(true);
    dispatch(updateNoteRequest({ token, body, note_id }))
      .then(unwrapResult)
      .then(() => {
        setLoading(false)
        handleGetNoteDetails()
      })
      .catch((err) => {
        showFaliureToast(err?.response?.data?.error)
        setLoading(false)
      })

  }

  const handleSummarizeNote = (updatedContent) => {
    const body = {
      data: JSON.stringify(updatedContent?.data),
      note_id,
      course_title: updatedContent?.title
    }
    if (!token || !note_id) return;

    setLoading(true);
    dispatch(summarizeNoteRequest({ token, body, note_id }))
      .then(unwrapResult)
      .then(() => {
        setLoading(false)
        handleGetNoteDetails()
      })
      .catch((err) => {
        showFaliureToast(err?.response?.data?.error)
        setLoading(false)
      })

  }

  return (
    <div>
      <Note loading={loading} handleSummarize={handleSummarizeNote} handleSave={handleEditNote} previousData={currentNoteDetails} />
    </div>
  )
}

export default NoteEditor
