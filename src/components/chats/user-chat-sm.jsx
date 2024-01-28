import { Avatar, Typography } from '@material-tailwind/react'
import React from 'react'

const UserCardSmall = ({profilePicture = "/img/bruce-mars.jpeg", fullName = "Bruce Mars"}) => {
    return (
        <div  className='flex items-center w-60 my-2 ms-3 me-1 px-4 py-1 cursor-pointer bg-white rounded-md'>
            <Avatar
                src={profilePicture}
                alt={"user"}
                size="md"
                variant="circular"
                className={`cursor-pointer border-2 border-white`}
            />

            <div className='mx-3'>
                <Typography className='text-sm font-medium'>{fullName}</Typography>
                <Typography style={{ fontSize: '10px' }} className='font-extralight'>Personal Chat</Typography>
            </div>
        </div>
    )
}

export default UserCardSmall
