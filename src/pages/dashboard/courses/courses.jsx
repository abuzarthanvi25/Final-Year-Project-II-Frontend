import AddCourse from '@/components/course/add-course/course-form';
import GroupCourse from '@/components/course/add-course/group-course-form';
import CourseCard from "@/components/course/course-card/course-card";
import CustomModal from '@/components/modals';
import useEffectOnce from '@/hooks/useEffectOnce';
import { getAllCoursesRequest, addCourseRequest, deleteCourseRequest, updateCourseRequest } from "@/store/reducers/course-reducer";
import { showFaliureToast, showSuccessToast } from '@/utils/toast-helpers';
import { Button, Typography } from "@material-tailwind/react";
import { Grid } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function Courses({ type }) {
    const { userDetails } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const [coursesLocal, setCoursesLocal] = useState([]);
    const [previousData, setPreviousData] = useState(null);
    const [open, setOpen] = useState(false);

    const { courses } = useSelector((state) => state.courses);

    const token = get(userDetails, "token", null);
    const userId = get(userDetails, "user._id", null);
    const navigate = useNavigate();

    useEffect(() => {
        if (courses) {
            setCoursesLocal(courses);
        }
    }, [courses])

    const dispatch = useDispatch();

    const handleGetCourses = () => {
        try {
            setLoading(true);

            if (token) {
                dispatch(getAllCoursesRequest({ token, type }))
                    .then(unwrapResult)
                    .then(() => {
                        setLoading(false)
                    })
                    .catch((err) => {
                        showFaliureToast(err?.response?.data?.message)
                        setLoading(false)
                    })
            }
        } catch (error) {
            console.log(err)
        }
    }

    useEffectOnce(() => {
        handleGetCourses();
    })

    const handleViewNotes = (id, course_title) => {
        if (type == 'Personal') {
            navigate(`/dashboard/courses/${id}`, { state: { course_title } })
        } else {
            navigate(`/dashboard/group-courses/${id}`, { state: { course_title } })
        }
    }

    const handleAddCourse = (body) => {
        try {
            setLoading(true);

            const payload = { ...body, type }

            if (token) {
                dispatch(addCourseRequest({ token, body: payload }))
                    .then(unwrapResult)
                    .then(() => {
                        setOpen(false);
                        handleGetCourses();
                        showSuccessToast(res?.data?.message)
                        setLoading(false)
                    })
                    .catch((err) => {
                        showFaliureToast(err?.response?.data?.message)
                        setLoading(false)
                    })
            }
        } catch (error) {
            console.log(err)
        }
    }

    const handleDeleteCourse = (course_id) => {
        try {
            if(!course_id || !token) return;

            setLoading(true);

            if (token) {
                dispatch(deleteCourseRequest({ token, course_id }))
                    .then(unwrapResult)
                    .then(() => {
                        setOpen(false);
                        handleGetCourses();
                        showSuccessToast(res?.data?.message)
                        setLoading(false)
                    })
                    .catch((err) => {
                        showFaliureToast(err?.response?.data?.message)
                        setLoading(false)
                    })
            }
        } catch (error) {
            console.log(err)
        }
    }

    const handleEditCourse = (body) => {
        try {
            setLoading(true);

            if (token && previousData?.course_id) {
                dispatch(updateCourseRequest({ token, body, course_id: previousData?.course_id }))
                    .then(unwrapResult)
                    .then(() => {
                        setOpen(false);
                        handleGetCourses();
                        showSuccessToast(res?.data?.message)
                        setLoading(false)
                    })
                    .catch((err) => {
                        showFaliureToast(err?.response?.data?.message)
                        setLoading(false)
                    })
            }
        } catch (error) {
            console.log(err)
        }
    }

    const handleGetMembers = (members) => {
        return members.filter((members) => members._id !== userId).map(({ _id }) => _id)
    }

    return (
        <div>
            <CustomModal open={open} onClose={() => setOpen(false)}>
                {
                    type == 'Personal' ?
                        <AddCourse type={type} previousData={previousData} handleAddCourse={previousData ? handleEditCourse : handleAddCourse} loading={loading} />
                        :
                        <GroupCourse type={type} previousData={previousData} handleAddCourse={previousData ? handleEditCourse : handleAddCourse} loading={loading} />
                }
            </CustomModal>
            <div className="w-full flex justify-start mt-3">
                <Button onClick={() => { setOpen(true), setPreviousData(null) }} size='lg' className="ms-10">Add Courses</Button>
            </div>
            <div className="w-full">
                <Typography className="text-center text-xl font-light text-gray-900">All Courses</Typography>
            </div>
            <div className="flex flex-wrap">
                <Grid container>
                    {
                        loading ? (
                            <div className="w-full text-center my-5"><Typography>
                                Loading...
                            </Typography></div>
                        ) : !!coursesLocal.length ?
                            coursesLocal.map(({ title, description, type, members, _id }) => (
                                <Grid className='m-0 p-0' key={_id} item md={4} xs={12} sm={6} lg={4} xl={4}>
                                    <div className="mx-auto my-6 flex max-w-xs flex-col gap-8">
                                        <CourseCard handleEditAction={() => {
                                            setPreviousData({ title, description, course_id: _id, members: members ? handleGetMembers(members) : [] });
                                            setOpen(true);
                                        }} handleDeleteCourse={() => handleDeleteCourse(_id)} handleViewNotes={() => handleViewNotes(_id, title)} title={title} description={description} type={type} members={members} />
                                    </div>
                                </Grid>
                            ))
                            : <Typography style={{ textAlign: 'center', color: 'gray' }} variant='small'>No Courses found</Typography>}
                </Grid>
            </div>
        </div>
    );
}

export default Courses;
