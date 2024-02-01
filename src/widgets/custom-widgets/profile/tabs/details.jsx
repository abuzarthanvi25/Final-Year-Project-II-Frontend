import { PencilIcon } from '@heroicons/react/24/solid'
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Avatar,
    Typography,
    Tooltip,
    Button,
} from "@material-tailwind/react";
import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { conversationsData, projectsData } from "@/data";
import { truncateString } from '@/utils/helpers';

const Details = ({ bio = "Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).", full_name = "Alec M. Thompson", email = "alecthompson@mail.com", phone_number = "(44) 123 1234 123", friends = conversationsData, loading, courses = [] }) => {

    const navigate = useNavigate();

    return (
        <>
            <div className="gird-cols-1 mb-12 grid gap-12 px-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                <ProfileInfoCard
                    title="Profile Information"
                    description={bio}
                    details={{
                        "first name": full_name,
                        mobile: phone_number,
                        email: email,
                        social: (
                            <div className="flex items-center gap-4">
                                <i className="fa-brands fa-facebook text-blue-700" />
                                <i className="fa-brands fa-twitter text-blue-400" />
                                <i className="fa-brands fa-instagram text-purple-500" />
                            </div>
                        ),
                    }}
                />
                {!!friends.length && <div>
                    <Typography variant="h6" color="blue-gray" className="mb-3">
                        Friends
                    </Typography>
                    <ul className="flex flex-col gap-6">
                        {friends.map((props, index) => (
                            <MessageCard
                                key={index}
                                {...props}
                                action={
                                    <Button onClick={() => navigate("/dashboard/chats", {state: props._id})} variant="filled" size="sm">
                                        Chat
                                    </Button>
                                }
                            />
                        ))}
                    </ul>
                </div>}
            </div>
            {
                !!courses.length && <div className="px-4 pb-4">
                    <Typography variant="h6" color="blue-gray" className="mb-2">
                        Personal Courses
                    </Typography>
                    <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
                        {courses.map(
                            ({ img = '/img/home-decor-1.jpeg', title, description, type, _id, members }, index) => (
                                <Card key={index} color="transparent" shadow={false}>
                                    <CardHeader
                                        floated={false}
                                        color="gray"
                                        className="mx-0 mt-0 mb-4 h-64 xl:h-28"
                                    >
                                        <img
                                            src={img}
                                            alt={title}
                                            className="h-full w-full object-cover"
                                        />
                                    </CardHeader>
                                    <CardBody className="py-0 px-1">
                                        <Typography
                                            variant="small"
                                            className="font-normal text-blue-gray-500"
                                        >
                                            {type}
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            color="blue-gray"
                                            className="mt-1 mb-2"
                                        >
                                            {title}
                                        </Typography>
                                        <Tooltip placement="top" content={<div className='w-80'>
                                            <Typography className='text-white font-medium text-xs'>{description}</Typography>
                                        </div>}>
                                            <Typography
                                                variant="small"
                                                className="font-normal text-blue-gray-500"
                                            >
                                                {truncateString(description, 80)}
                                            </Typography>
                                        </Tooltip>
                                    </CardBody>
                                    <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                                        <Button onClick={() => { navigate(`/dashboard/courses/${_id}`) }} variant="filled" size="sm">
                                            View Notes
                                        </Button>
                                        <div>
                                            {members.map(({ img, name }, key) => (
                                                <Tooltip key={key} content={name}>
                                                    <Avatar
                                                        src={img}
                                                        alt={name}
                                                        size="xs"
                                                        variant="circular"
                                                        className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"
                                                            }`}
                                                    />
                                                </Tooltip>
                                            ))}
                                        </div>
                                    </CardFooter>
                                </Card>
                            )
                        )}
                    </div>
                </div>
            }
        </>
    )
}

export default Details
