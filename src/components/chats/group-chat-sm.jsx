import { IconButton, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react'
import React from 'react'
import CustomAvatar from "../custom-avatar"
import { Bars3Icon, EllipsisVerticalIcon, TrashIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'

const ListCardSmall = ({ loading=false, previewImage = "/img/bruce-mars.jpeg", name = "Babu Bhai", type = 'Personal', handleChangeRoom = () => { }, handleDeleteChatRoom = () => {} }) => {
    return (
        <div style={{pointerEvents: loading ? 'none' : 'all'}} className='flex items-center justify-between w-full my-2 ms-3 me-1 px-4 py-1 cursor-pointer bg-white rounded-md'>

            <div onClick={handleChangeRoom} className='flex'>
                <CustomAvatar sx={{ borderRadius: '10px' }} src={previewImage} name={name} className={"shadow-lg shadow-blue-gray-500/25"} />
                <div className='ms-4'>
                    <Typography className='text-sm font-medium'>{name}</Typography>
                    <Typography style={{ fontSize: '10px' }} className='font-extralight'>{type} Chat</Typography>
                </div>
            </div>

            <div>
                <Menu placement='bottom'>
                    <MenuHandler>
                        <IconButton variant="text" color="blue-gray">
                            <EllipsisVerticalIcon strokeWidth={3} className="h-5 w-5 text-blue-gray-500" />
                        </IconButton>
                    </MenuHandler>
                    <MenuList className="w-fit border-0">
                        <MenuItem disabled={loading} onClick={handleDeleteChatRoom} className="flex items-center gap-3 bg-red-500">
                            <TrashIcon className="h-4 w-4 me-2 text-white" />
                            <Typography className='text-sm text-white'>Delete Chat</Typography>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </div>
    )
}

export default ListCardSmall
