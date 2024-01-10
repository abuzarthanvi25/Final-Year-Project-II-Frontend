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
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { conversationsData, projectsData } from "@/data";

const Details = () => {
    return (
        <>
            <div className="gird-cols-1 mb-12 grid gap-12 px-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                <ProfileInfoCard
                    title="Profile Information"
                    description="Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                    details={{
                        "first name": "Alec M. Thompson",
                        mobile: "(44) 123 1234 123",
                        email: "alecthompson@mail.com",
                        location: "USA",
                        social: (
                            <div className="flex items-center gap-4">
                                <i className="fa-brands fa-facebook text-blue-700" />
                                <i className="fa-brands fa-twitter text-blue-400" />
                                <i className="fa-brands fa-instagram text-purple-500" />
                            </div>
                        ),
                    }}
                    action={
                        <Tooltip content="Edit Profile">
                            <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                        </Tooltip>
                    }
                />
                <div>
                    <Typography variant="h6" color="blue-gray" className="mb-3">
                        Friends
                    </Typography>
                    <ul className="flex flex-col gap-6">
                        {conversationsData.map((props) => (
                            <MessageCard
                                key={props.name}
                                {...props}
                                action={
                                    <Button variant="text" size="sm">
                                        reply
                                    </Button>
                                }
                            />
                        ))}
                    </ul>
                </div>
            </div>
            <div className="px-4 pb-4">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                    Personal Projects
                </Typography>
                <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500"
                >
                    Personal Projects Completed
                </Typography>
                <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
                    {projectsData.map(
                        ({ img, title, description, tag, route, members }) => (
                            <Card key={title} color="transparent" shadow={false}>
                                <CardHeader
                                    floated={false}
                                    color="gray"
                                    className="mx-0 mt-0 mb-4 h-64 xl:h-40"
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
                                        {tag}
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        color="blue-gray"
                                        className="mt-1 mb-2"
                                    >
                                        {title}
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        className="font-normal text-blue-gray-500"
                                    >
                                        {description}
                                    </Typography>
                                </CardBody>
                                <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                                    <Link to={route}>
                                        <Button variant="outlined" size="sm">
                                            view project
                                        </Button>
                                    </Link>
                                    <div>
                                        {members.map(({ img, name }, key) => (
                                            <Tooltip key={name} content={name}>
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
        </>
    )
}

export default Details
