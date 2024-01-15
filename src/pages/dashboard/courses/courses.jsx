import AddCourse from '@/components/course/add-course/course-form';
import CourseCard from "@/components/course/course-card/course-card";
import CustomModal from '@/components/modals';
import { getAllCoursesRequest, addCourseRequest } from "@/store/reducers/course-reducer";
import { showFaliureToast, showSuccessToast } from '@/utils/toast-helpers';
import { Button, Typography } from "@material-tailwind/react";
import { Grid } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function Courses() {
    const { userDetails } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const [coursesLocal, setCoursesLocal] = useState([]);
    const [open, setOpen] = useState(false);

    const { personalCourses } = useSelector((state) => state.courses);

    const token = get(userDetails, "token", null);
    const navigate = useNavigate();

    useEffect(() => {
        if (personalCourses) {
            setCoursesLocal(personalCourses);
        }
    }, [personalCourses])

    const dispatch = useDispatch();

    const handleGetCourses = () => {
        try {
            setLoading(true);

            if (token) {
                dispatch(getAllCoursesRequest({ token }))
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

    useEffect(() => {
        handleGetCourses();
    }, [])

    const handleViewNotes = (id) => {
        navigate(`/dashboard/courses/${id}`)
    }

    const handleAddCourse = (body) => {
        try {
            setLoading(true);

            if (token) {
                dispatch(addCourseRequest({ token, body }))
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

    return (
        <div>
            <CustomModal open={open} onClose={() => setOpen(false)}>
                <AddCourse handleAddCourse={handleAddCourse} loading={loading} />
            </CustomModal>
            <div className="w-full flex justify-start mt-3">
                <Button onClick={() => setOpen(true)} size='lg' className="ms-10">Add Courses</Button>
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
                                        <CourseCard handleViewNotes={() => handleViewNotes(_id)} title={title} description={description} type={type} members={members} />
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
