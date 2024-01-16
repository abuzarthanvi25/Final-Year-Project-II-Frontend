import Editor from '@/components/editor';
import { Typography } from '@material-tailwind/react';
import { get } from 'lodash';
import React from 'react'
import { useParams } from 'react-router-dom'

const CourseDetails = () => {
    const params = useParams();
    const id = get(params, 'id', null); //NOTE - Fetch notes by course id
  return (
    <div>
      <div className='w-full'>
        <Typography className='text-center text-xl'>Notes</Typography>
      </div>
    </div>
  )
}

export default CourseDetails
