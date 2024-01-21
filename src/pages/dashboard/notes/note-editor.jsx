import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Note from '../../../components/notes/index'
import React, { useEffect, useState } from 'react'
import { get } from 'lodash';
import { getNoteDetailsRequest, summarizeNoteRequest, updateNoteRequest, imageToNoteRequest } from '@/store/reducers/note-reducer';
import { unwrapResult } from '@reduxjs/toolkit';
import { showFaliureToast } from '@/utils/toast-helpers';
import { useDispatch } from 'react-redux';

const NoteEditor = () => {
  const { state } = useLocation();
  const {id: note_id} = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false)
  const [currentNoteDetails, setCurrentNoteDetails] = useState(null)

  const course_id = get(state, 'course_id', null);
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
      <Note handleImageToNote={handleImageToNote} loading={loading} handleSummarize={handleSummarizeNote} handleSave={handleEditNote} previousData={currentNoteDetails} />
    </div>
  )
}

export default NoteEditor
