import AddNoteCard from '@/components/notes/notes-add-small';
import NotesCardSmall from '@/components/notes/notes-card-small';
import { deleteNoteRequest, getAllNotesRequest } from '@/store/reducers/note-reducer';
import { formatDate } from '@/utils/helpers';
import { showFaliureToast } from '@/utils/toast-helpers';
import { Typography } from '@material-tailwind/react';
import { Grid } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import Divider from '@mui/material/Divider';

const CourseDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userDetails } = useSelector((state) => state.auth);
  const { profileDetails } = useSelector((state) => state.user)
  const { personalNotes } = useSelector((state) => state.notes);

  const token = get(userDetails, "token", null);
  const profile_picture = get(profileDetails, "profile_picture", null);
  const full_name = get(profileDetails, "full_name", null);

  const [loading, setLoading] = useState(false);
  const [notesLocal, setNotesLocal] = useState([]);
  const course_id = get(params, 'id', null); //NOTE - Fetch notes by course id

  const handleGetNotes = () => {
    try {
      if (!token || !course_id) return;

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
      dispatch(deleteNoteRequest({ token, note_id }))
        .then(unwrapResult)
        .then(() => {
          handleGetNotes()
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

  useEffect(() => handleGetNotes(), [])

  useEffect(() => {
    if (personalNotes) {
      setNotesLocal(personalNotes);
    }
  }, [personalNotes])

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
          <Grid item md={2}>
            <div>
              <Typography className='text-md text-left'>Image notes</Typography>
              <AddNoteCard imgSrc='https://store-images.s-microsoft.com/image/apps.39624.13695268441854138.658f4ff5-4bef-433d-b9af-380405a9f435.1584c97f-c81d-4af4-8220-04010a2e5f32' />
            </div>
          </Grid>
          <Grid item md={2}>
            <div>
              <Typography className='text-md text-left'>Voice notes</Typography>
              <AddNoteCard imgSrc='data:image/png;base64,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' />
            </div>
          </Grid>
          <Grid item md={12}>
            <Divider component="div" />
            <Typography className='text-left text-md mt-2'>Recent Notes</Typography>
          </Grid>
          {
            !loading && notesLocal?.length ? notesLocal.map(({ title, updated_at, _id, data }, index) => (
              <Grid key={index} item md={3}>
                <NotesCardSmall loading={loading} handleDelete={() => handleDeleteNote(_id)} handleClickNote={() => navigate(`/dashboard/notes/edit/${_id}`, {state: {title, updated_at, token, data, course_id}})} profile_picture={profile_picture} full_name={full_name} title={title} updatedAt={formatDate(updated_at)} />
              </Grid>
            ))

              : <div className='w-full h-full'><p className='text-center'>No Notes</p></div>
          }
        </Grid>
      </div>
    </div>
  )
}

export default CourseDetails
