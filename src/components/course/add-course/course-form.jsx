import useEffectOnce from '@/hooks/useEffectOnce';
import { addCourseInitialValues, addCourseValidationSchema } from '@/utils/validations/course-validations';
import { Button, Typography } from '@material-tailwind/react';
import { CircularProgress, TextField } from '@mui/material'
import { useFormik } from 'formik';
import React, { useEffect } from 'react'

const AddCourse = ({loading = false, handleAddCourse = () => {}, previousData = null, type}) => {

    const formik = useFormik({
        initialValues: addCourseInitialValues,
        validationSchema: addCourseValidationSchema,
        onSubmit: values => {
         handleAddCourse({...values, type});
        }
      })

      useEffectOnce(() => {
        if(previousData){
          formik.setFieldValue('title', previousData?.title);
          formik.setFieldValue('description', previousData?.description);
        }
      })

  return (
    <section className='w-full p-3'>
      <div style={{minWidth: '320px'}}>
        <div className="text-center w-full">
            <Typography className="text-3xl mb-4">Add A Course</Typography>
        </div>

        <form onSubmit={formik.handleSubmit} className="mt-8 mb-2 mx-auto w-full">
        <div className="mb-1 flex flex-col">
          <TextField
            fullWidth
            id='title'
            label='Title'
            variant='outlined'
            size='small' // Added to make the field smaller
            sx={{ marginBottom: 4 }}
            {...formik.getFieldProps('title')}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
        />
          <TextField
            fullWidth
            id='description'
            label='Description'
            multiline
            variant='outlined'
            rows={5}
            // minRows={5} //NOTE - REMOVED MIN AND MAX ROWS FOR RE-RENDER BUG WTF
            // maxRows={12}
            size='small' // Added to make the field smaller
            sx={{ marginBottom: 4 }}
            {...formik.getFieldProps('description')}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
        />
          </div>
          <Button disabled={loading} type='submit' className="mt-1" fullWidth>
            {loading ? <CircularProgress size={16} style={{color: 'white'}} /> : previousData ? "Edit Course" : "Add Course"}
          </Button>
        </form>
      </div>
    </section>
  )
}

export default AddCourse
