import { Avatar, Button, Typography } from '@material-tailwind/react';
import { CircularProgress, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

const EditProfile = ({ loading = false, previousData, handleEditProfile = () => { } }) => {

    const navigate = useNavigate();
    const [selectedFileUrl, setSelectedFileUrl] = useState("");

    useEffect(() => {
        if (previousData) {
            formik.setFieldValue('full_name', previousData?.full_name);
            formik.setFieldValue('phone_number', previousData?.phone_number);
            formik.setFieldValue('bio', previousData?.bio);
            setSelectedFileUrl(previousData?.profile_picture?.url)
        }
    }, [previousData])

    const imgRef = useRef();

    const formik = useFormik({
        initialValues: {
            full_name: "",
            phone_number: "",
            bio: "",
            profile_picture: null
        },
        validationSchema: Yup.object({
            full_name: Yup.string().required('Full name is required'),
            phone_number: Yup.string().required('Phone number is required'),
            bio: Yup.string().max(255, 'Bio must be at most 255 characters').required('Phone number is required'),
            profile_picture: Yup.mixed().nullable(),
        }),
        onSubmit: values => {
            handleEditProfile(values);
        }
    })

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            formik.setFieldValue("profile_picture", selectedFile);
            const reader = new FileReader()

            reader.onload = () => {
                setSelectedFileUrl(reader.result);
            }

            reader.readAsDataURL(selectedFile)
        }
    };

    const handleButtonClick = () => {
        
        if(selectedFileUrl !== previousData?.profile_picture?.url){
            setSelectedFileUrl(previousData?.profile_picture?.url)
            formik.setFieldValue("profile_picture", null)
        }

        imgRef.current.click();

    };

    return (
        <>
            <div>
                <form style={{pointerEvents: loading ? 'none' : 'all'}} onSubmit={formik.handleSubmit} className="mt-8 mb-2 mx-auto w-full">
                    <div className="mb-1">
                        <Grid container spacing={5}>
                            <Grid item md={4}>
                                <div className='flex justify-center flex-col items-center'>
                                    <Typography className='text-xs mb-1 font-semibold'>Profile Picture</Typography>
                                    <Avatar src={selectedFileUrl} size='xxl' variant='rounded' />
                                    {
                                        formik.touched.profile_picture && formik.errors.profile_picture && <Typography className='text-xs my-1 text-red-700 font-semibold'>{formik.errors.profile_picture}</Typography>
                                    }
                                    <Button onClick={handleButtonClick} className='text-xs my-2' size='sm' variant='outlined'>{selectedFileUrl !== previousData?.profile_picture?.url ? "Upload Another" :"Upload Picture"}</Button>
                                </div>
                                <input onChange={handleFileChange} ref={imgRef} id='IMG' className='hidden' type="file" src="" alt="" /></Grid>
                            <Grid item md={6}>
                                <TextField
                                    fullWidth
                                    id='full_name'
                                    label='Full Name'
                                    variant='outlined'
                                    size='small' // Added to make the field smaller
                                    sx={{ marginBottom: 4 }}
                                    {...formik.getFieldProps('full_name')}
                                    error={formik.touched.full_name && Boolean(formik.errors.full_name)}
                                    helperText={formik.touched.full_name && formik.errors.full_name}
                                />
                                <TextField
                                    fullWidth
                                    id='bio'
                                    rows={5}
                                    multiline
                                    label='Bio'
                                    variant='outlined'
                                    size='small' // Added to make the field smaller
                                    sx={{ marginBottom: 4 }}
                                    {...formik.getFieldProps('bio')}
                                    error={formik.touched.bio && Boolean(formik.errors.bio)}
                                    helperText={formik.touched.bio && formik.errors.bio}
                                />

                                <TextField
                                    fullWidth
                                    id='phone_number'
                                    label='Phone Number'
                                    variant='outlined'
                                    size='small' // Added to make the field smaller
                                    sx={{ marginBottom: 4 }}
                                    {...formik.getFieldProps('phone_number')}
                                    error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                                    helperText={formik.touched.phone_number && formik.errors.phone_number}
                                />
                            </Grid>
                        </Grid>

                        <div className='w-full flex justify-center'>
                            <Button disabled={loading} type='submit' className="mt-6">
                                {loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : "Update Profile"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditProfile
