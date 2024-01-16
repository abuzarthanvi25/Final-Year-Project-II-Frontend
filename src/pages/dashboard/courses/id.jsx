import NotesCardSmall from '@/components/notes/notes-card-small';
import { Typography } from '@material-tailwind/react';
import { Grid } from '@mui/material';
import { get } from 'lodash';
import React from 'react'
import { useParams } from 'react-router-dom'

const CourseDetails = () => {
    const params = useParams();
    const course_id = get(params, 'id', null); //NOTE - Fetch notes by course id

    const handleGetNotes = () => {
    }
  return (
    <div>
      <div className='w-full'>
        <Typography className='text-center text-xl'>Notes</Typography>
        <Grid container spacing={3} className='p-3'>
          <Grid item md={3}>
            <NotesCardSmall/>
          </Grid>
          <Grid item md={3}>
            <NotesCardSmall/>
          </Grid>
          <Grid item md={3}>
            <NotesCardSmall/>
          </Grid>
          <Grid item md={3}>
            <NotesCardSmall/>
          </Grid>
          <Grid item md={3}>
            <NotesCardSmall/>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default CourseDetails
