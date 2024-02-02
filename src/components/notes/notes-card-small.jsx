import { Avatar, IconButton, Menu, MenuHandler, MenuItem, MenuList, Tooltip, Typography } from '@material-tailwind/react'
import { EllipsisVerticalIcon, ListBulletIcon, TrashIcon, UserCircleIcon, DocumentIcon } from '@heroicons/react/24/solid'
import { truncateString } from '@/utils/helpers'
import "./notes-card-small.css"

const NotesCardSmall = ({ profile_picture = '', full_name = '', title = 'Shit Note Shit Note Shita Note Shita Note Shita', updatedAt = '12-10-2024', handleDelete = () => { }, handleClickNote = () => { }, loading = false }) => {
    return (
        <div style={{ pointerEvents: loading ? 'none' : 'all' }} className='w-fit note-body'>
            <div onClick={handleClickNote} style={{ height: '240px', width: '220px', backgroundColor: '#fff', border: '0.5px solid #DADADA', borderTopRightRadius: '3px', borderTopLeftRadius: '3px', cursor: 'pointer' }}>
                {
                    !!loading && <div className='w-full h-full flex justify-center items-center'><Typography>Loading...</Typography></div>
                }
            </div>
            <div className='px-2 py-1 m-0' style={{ width: '220px', backgroundColor: '#fff', borderBottom: '0.5px solid #DADADA', borderRight: '0.5px solid #DADADA', borderLeft: '0.5px solid #DADADA', borderBottomLeftRadius: '3px', borderBottomRightRadius: '3px' }}>
                <Tooltip style={{ maxWidth: '16px' }} placement="top" content={<span className='text-xs w-80'>{title}</span>}>
                    <Typography style={{ fontSize: '13px', fontWeight: '500' }}>{truncateString(title, 26)}</Typography>
                </Tooltip>
                <div className='flex items-center justify-between'>
                    <div className='flex justify-evenly'>
                        <Tooltip placement="bottom-start" content={full_name}>
                            <Avatar
                                src={profile_picture?.url ? profile_picture?.url : '/img/placeholder-avatar.webp'}
                                alt={full_name}
                                size="xs"
                                variant="circular"
                                className={`cursor-pointer border-2 border-white`}
                            />
                        </Tooltip>
                        <DocumentIcon
                            strokeWidth={2}
                            fill="#8E8E8E"
                            style={{ borderRadius: '5px' }}
                            className="h-6 w-6"
                        />
                    </div>
                    <div className='flex items-center'>
                        <Typography style={{ fontSize: '10.5px' }} className='me-1 text-gray-700'>{updatedAt}</Typography>
                        <Menu placement="right-start">
                            <MenuHandler>
                                <IconButton style={{ borderRadius: '50%' }} size="sm" variant="text" color="blue-gray">
                                    <EllipsisVerticalIcon
                                        strokeWidth={3}
                                        fill="currenColor"
                                        className="h-5 w-5"
                                    />
                                </IconButton>
                            </MenuHandler>
                            <MenuList className='min-w-fit m-0 px-0 py-1'>
                                <MenuItem onClick={handleDelete}>
                                    <div className='flex justify-evenly items-center'>
                                        <Typography className='text-xs text-gray-900'>Delete</Typography>
                                        <TrashIcon
                                            strokeWidth={3}
                                            fill="red"
                                            className="h-3.5 ms-1"
                                        />
                                    </div>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotesCardSmall
