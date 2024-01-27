import { formatDateNew } from '@/utils/helpers';
import { Avatar, Typography } from '@material-tailwind/react'
import { get } from 'lodash'
import React from 'react'

const Message = ({ message, timeStamps, sender, isCurrentUser = false }) => {

    const profilePicture = get(sender, "profile_picture.url", "");
    const fullName = get(sender, "full_name", "");
    const messageDateTime = get(timeStamps, "updatedAt", "");

    return (
        <div className={`flex justify-${isCurrentUser ? 'end' : 'start'} items-stretch my-3`}>
            {
                !isCurrentUser &&
                <div>
                    <Avatar src={profilePicture} alt={fullName} size='sm' className='border-2 border-gray-300' />
                </div>
            }
            <div className={`ms-2 mt-1 ${isCurrentUser ? "bg-blue-gray-100" : "bg-blue-gray-50/50"} py-1 px-3 rounded-lg`}>
                <Typography className='font-semibold' style={{ fontSize: '10.5px', letterSpacing: '0.4px', wordSpacing: '1px' }}>{fullName}</Typography>
                <Typography style={{ fontSize: '18px' }}>{message}</Typography>
                <Typography className='font-extralight text-right mt-1' style={{ fontSize: '8.5px' }}>{formatDateNew(messageDateTime)}</Typography>
            </div>
            {
                isCurrentUser && <div className='mx-1 flex flex-col itemms-center'>
                    <Avatar src={profilePicture} alt={fullName} size='sm' className='border-2 border-gray-300' />
                    <Typography style={{fontSize:"10px"}} className='text-center'>You</Typography>
                </div>
            }
        </div>
    )
}

export default Message
