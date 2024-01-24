import CustomModal from '@/components/modals';
import { addCourseInitialValues, addCourseValidationSchema, addGroupCourseInitialValues, addGroupCourseValidationSchema } from '@/utils/validations/course-validations';
import { Button, Chip, Typography } from '@material-tailwind/react';
import { CircularProgress, TextField } from '@mui/material'
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import MemberDetailsSmall from '../../../components/search-users/member-component-sm';
import { useSelector } from 'react-redux';
import { get } from 'lodash';

const AddCourse = ({ loading = false, handleAddCourse = () => { }, previousData = null, type }) => {

    const [open, setOpen] = useState(false)
    const { profileDetails } = useSelector((state) => state.user)

    const friends = get(profileDetails, 'friends', [])

    const formik = useFormik({
        initialValues: addGroupCourseInitialValues,
        validationSchema: addGroupCourseValidationSchema,
        onSubmit: values => {
            handleAddCourse({ ...values, type });
        }
    })

    useEffect(() => {
        if(previousData){
          formik.setFieldValue('title', previousData?.title);
          formik.setFieldValue('description', previousData?.description);
          formik.setFieldValue('members', previousData?.members);
        }
      }, [])


    const handleAddMember = (_id) => {
        formik.setValues({
            ...formik.values,
            members: [...formik.values.members, _id],
        });
    };

    const handleRemoveMember = (_id) => {
        formik.setValues({
            ...formik.values,
            members: formik.values.members.filter((memberId) => memberId !== _id),
        });
    };

    const isAlreadyAdded = (_id) => {
        if (!_id) return false;
    
        return formik.values?.members?.includes(_id)
    };

    const handleMembers = (id) => {
        if(!id) return

        if(isAlreadyAdded(id)){
            handleRemoveMember(id)
        }else{
            handleAddMember(id)
        }
    }

    const handleGetMemberName = (id) => {
        if(!id) return

        return friends.find((friend) => friend._id == id)?.full_name
    }

    return (
        <section className='w-full p-3'>
            <CustomModal open={open} onClose={() => setOpen(false)}>
                <div style={{ width: '600px' }}>
                    {
                        friends.map(({ _id, email, full_name, profile_picture }) => (
                            <MemberDetailsSmall
                                key={email}
                                email={email}
                                handleAddMember={() => handleMembers(_id)}
                                full_name={full_name}
                                profile_picture={profile_picture?.url}
                                isAlreadyAdded={isAlreadyAdded(_id)}
                            />
                        ))
                    }
                </div>
            </CustomModal>
            <div style={{ minWidth: '320px' }}>
                <div className="text-center w-full">
                    <Typography className="text-3xl mb-4">Add A Group Course</Typography>
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

                        <div>
                            <Button variant='outlined' size='sm' onClick={() => setOpen(true)}>Add/Remove Members</Button>
                            <Typography className='text-xs text-red-800 my-1 ms-3 font-medium' variant='small'>{formik.touched.members && formik.errors.members ? formik.errors.members : ''}</Typography>
                        </div>
                        <div className='flex flex-wrap'>
                        {
                            formik.values?.members?.map((id) => (<Chip variant='ghost' className='w-fit my-1 mx-1' value={handleGetMemberName(id)} />))
                        }
                        </div>
                    </div>
                    <Button disabled={loading} type='submit' className="mt-3" fullWidth>
                        {loading ? <CircularProgress size={16} style={{ color: 'white' }} /> : previousData ? "Edit Course" : "Add Course"}
                    </Button>
                </form>
            </div>
        </section>
    )
}

export default AddCourse
