import AddNoteCard from '@/components/notes/notes-add-small';
import NotesCardSmall from '@/components/notes/notes-card-small';
import { deleteNoteRequest, getAllNotesRequest } from '@/store/reducers/note-reducer';
import { formatDate, formatDateNew } from '@/utils/helpers';
import { showFaliureToast } from '@/utils/toast-helpers';
import { Typography } from '@material-tailwind/react';
import { Grid } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import Divider from '@mui/material/Divider';
import NotesCardSmallSkeleton from '@/components/notes/skeleton-notes-card-small';

const NotesList = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userDetails } = useSelector((state) => state.auth);
  const { profileDetails } = useSelector((state) => state.user)
  const { notes } = useSelector((state) => state.notes);
  const { courses, courseType } = useSelector((state) => state.courses);

  const token = get(userDetails, "token", null);
  const profile_picture = get(profileDetails, "profile_picture", null);
  const full_name = get(profileDetails, "full_name", null);

  const [loading, setLoading] = useState(false);
  const [notesLocal, setNotesLocal] = useState([]);
  const [courseTypeLocal, setCourseTypeLocal] = useState("")
  const course_id = get(params, 'id', null); //NOTE - Fetch notes by course id

  const handleGetCourseTitle = () => {
    if(!course_id) return ''

    const course = courses?.find((course) => course._id == course_id)

    if(course){
      return course?.title
    }

    return ''
  }

  const handleGetNotes = () => {
    try {
      if (!token || !course_id) return;

      setLoading(true)
      dispatch(getAllNotesRequest({ token, course_id }))
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

  const handleDeleteNote = (note_id) => {
    try {
      if (!token || !note_id) return;

      setLoading(true)
      dispatch(deleteNoteRequest({ token, note_id }))
        .then(unwrapResult)
        .then(() => {
          handleGetNotes()
        })
        .catch((err) => {
          showFaliureToast(err?.response?.data?.message)
          setLoading(false)
        })

    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => handleGetNotes(), [])

  useEffect(() => {
    if (notes) {
      setNotesLocal(notes);
    }
    if(courseType){
      setCourseTypeLocal(courseType)
    }
  }, [notes])

  const handleNavigateToNote = (_id, title, updated_at, token, data, course_id) => {
    if(courseType == 'Personal'){
      navigate(`/dashboard/notes/edit/${_id}`, {state: {title, updated_at, token, data, course_id, course_title: handleGetCourseTitle()}})
    }else{
      navigate(`/dashboard/group-notes/edit/${_id}`, {state: {title, updated_at, token, data, course_id, course_title: handleGetCourseTitle()}})
    }
  }

  return (
    <div>
      <div className='w-full'>
        <Grid container spacing={3} className=''>
          <Grid item md={2}>
            <div>
              <Typography className='text-md text-left'>Create a note</Typography>
              <AddNoteCard handleAddNote={()=> navigate('/dashboard/notes/create-note', {state: {course_id, token}})} />
            </div>
          </Grid>
          <Grid item md={12}>
            <Divider component="div" />
            <Typography className='text-left text-md mt-2'>Recent Notes</Typography>
          </Grid>
          {
            loading ? [1,2,3,4].map((_) => (
              <Grid key={_} item md={3}><NotesCardSmallSkeleton/></Grid>
            )) :
             notesLocal?.length ? notesLocal.map(({ title, updated_at, _id, data }, index) => (
              <Grid key={index} item md={3}>
                <NotesCardSmall loading={loading} handleDelete={() => handleDeleteNote(_id)} handleClickNote={() => handleNavigateToNote(_id, title, updated_at, token, data, course_id)} profile_picture={profile_picture} full_name={full_name} title={title} updatedAt={formatDateNew(updated_at)} />
              </Grid>
            ))
              : <div className='w-full h-full'><p className='text-center'>No Notes Found</p></div>
          }
        </Grid>
      </div>
    </div>
  )
}

export default NotesList
