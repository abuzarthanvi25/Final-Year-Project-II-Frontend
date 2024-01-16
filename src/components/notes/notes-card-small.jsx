import { IconButton, Menu, MenuHandler, MenuItem, MenuList, Tooltip, Typography } from '@material-tailwind/react'
import { EllipsisVerticalIcon, ListBulletIcon, TrashIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { truncateString } from '@/utils/helpers'

const NotesCardSmall = ({title = 'Shit Note Shit Note Shita Note Shita Note Shita', updatedAt = '12-10-2024', handleDelete= () => {}, handleClickNote = () => {}}) => {
  return (
    <div className='cursor-pointer w-fit' onClick={handleClickNote}>
        <div style={{height: '200px', width: '180px', backgroundColor:'#fff', border: '0.5px solid #BABABA', borderTopRightRadius:'3px', borderTopLeftRadius: '3px'}}>

        </div> 
        <div className='px-2 py-1 m-0' style={{width: '180px', backgroundColor:'#fff', borderBottom: '0.5px solid #BABABA', borderRight: '0.5px solid #BABABA', borderLeft:'0.5px solid #BABABA', borderBottomLeftRadius:'3px', borderBottomRightRadius:'3px' }}>
            <Tooltip style={{maxWidth: '16px'}} placement="top" content={<span className='text-xs w-80'>{title}</span>}>
                <Typography style={{fontSize:'11px', fontWeight:'500'}}>{truncateString(title, 30)}</Typography>
            </Tooltip>
            <div className='flex items-center justify-between'>
            <div className='flex justify-evenly'>
                <UserCircleIcon
                    strokeWidth={2}
                    fill="#006291"
                    className="h-5 w-5"
                />
            <ListBulletIcon
                strokeWidth={2}
                fill="#006291"
                style={{borderRadius:'5px'}}
                className="h-5 w-5"
            />
            </div>
            <div className='flex items-center'>
            <Typography style={{fontSize:'11px'}} className='me-1'>{updatedAt}</Typography>
            <Menu placement="right-start">
                <MenuHandler>
                    <IconButton style={{borderRadius:'50%'}} size="sm" variant="text" color="blue-gray">
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
