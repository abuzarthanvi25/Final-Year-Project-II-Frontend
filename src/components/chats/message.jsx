import { formatDateNew } from '@/utils/helpers';
import { ChevronDownIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Avatar, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react'
import { get } from 'lodash'
import React from 'react'
import "./message.css"

const Message = ({ message, timeStamps, sender, isCurrentUser = false, handleDeleteMessage }) => {

    const profilePicture = get(sender, "profile_picture.url", "");
    const fullName = get(sender, "full_name", "");
    const messageDateTime = get(timeStamps, "updatedAt", "");

    return (
        <div className={`flex justify-${isCurrentUser ? 'end' : 'start'} items-stretch my-3 message`}>
            {
                !isCurrentUser &&
                <div>
                    <Avatar src={profilePicture} alt={fullName} size='sm' className='border-2 border-gray-300 cursor-pointer' />
                </div>
            }
            <div className={`ms-2 mt-1 ${isCurrentUser ? "bg-blue-gray-100" : "bg-blue-gray-50/50"} py-1 px-3 rounded-lg`}>
                <Menu placement='right-start'>
                <div className='flex'>
                    <Typography className='font-semibold' style={{ fontSize: '10.5px', letterSpacing: '0.4px', wordSpacing: '1px' }}>{fullName}</Typography>
                    <MenuHandler>
                        <ChevronDownIcon fill='#343434' className="h-5 w-5 text-blue-gray-500 ms-2 del-btn cursor-pointer"/>
                    </MenuHandler>
                </div>
                    <MenuList className="min-w-fit m-0 p-1">
                        <MenuItem onClick={handleDeleteMessage} className="flex items-center">
                            <Typography className='text-xs font-semibold'>Delete</Typography>
                        </MenuItem>
                        {/* <MenuItem className="flex items-center">
                            <Typography className='text-xs font-semibold'>Edit</Typography>
                        </MenuItem> */}
                    </MenuList>
                </Menu>
                <Typography className='text-gray-800' style={{ fontSize: '18px', fontWeight:'400' }}>{message}</Typography>
                <Typography className='font-extralight text-right mt-1' style={{ fontSize: '8.5px' }}>{formatDateNew(messageDateTime)}</Typography>
            </div>
            {
                isCurrentUser && <div className='mx-1 flex flex-col itemms-center'>
                    <Avatar src={profilePicture} alt={fullName} size='sm' className='border-2 border-gray-300 cursor-pointer' />
                    <Typography style={{fontSize:"10px"}} className='text-center'>You</Typography>
                </div>
            }
        </div>
    )
}

export default Message
