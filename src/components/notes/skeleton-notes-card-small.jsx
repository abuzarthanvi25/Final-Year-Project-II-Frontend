import React from 'react';
import { Skeleton } from '@mui/material';
import {
  Avatar,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Tooltip,
  Typography
} from '@material-tailwind/react';
import { EllipsisVerticalIcon, TrashIcon, DocumentIcon } from '@heroicons/react/24/solid';
import './notes-card-small.css';

const NotesCardSmallSkeleton = () => {
  return (
    <div className='w-fit'>
      <div style={{ height: '200px', width: '200px', backgroundColor: '#fff', borderTopRightRadius: '3px', borderTopLeftRadius: '3px' }}>
        <Skeleton variant="rect" animation="wave" width={200} height={200} />
      </div>
      <div className='px-2 py-1 m-0' style={{ width: '200px', backgroundColor: '#fff', borderBottomLeftRadius: '3px', borderBottomRightRadius: '3px' }}>
        <Tooltip style={{ maxWidth: '16px' }} placement="top" title={<Skeleton animation="wave" width={80} height={12} />}>
          <Typography style={{ fontSize: '13px', fontWeight: '500' }}>
            <Skeleton animation="wave" width={120} height={12} />
          </Typography>
        </Tooltip>
        <div className='flex items-center justify-between'>
          <div className='flex justify-evenly'>
            <Skeleton variant="circular" width={24} height={24} />
            <DocumentIcon
              strokeWidth={2}
              fill="#006291"
              style={{ borderRadius: '5px' }}
              className="h-6 w-6"
            />
          </div>
          <div className='flex items-center'>
            <Typography style={{ fontSize: '12px' }} className='me-1 text-gray-700'>
              <Skeleton animation="wave" width={50} height={10} />
            </Typography>
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
                <MenuItem>
                  <div className='flex justify-evenly items-center'>
                    <Typography className='text-xs text-gray-900'>
                      <Skeleton animation="wave" width={40} height={10} />
                    </Typography>
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
  );
}

export default NotesCardSmallSkeleton;
