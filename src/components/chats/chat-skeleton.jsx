import React from 'react';
import { Skeleton } from '@mui/material';

const ListCardSmallSkeleton = () => {
    return (
        <div className='flex items-center justify-between w-full my-2 ms-3 me-1 px-4 py-1 cursor-pointer bg-white rounded-md'>
            <div className='flex'>
                <Skeleton animation='wave' className='rounded-md' variant="circle" width={40} height={40} />
                <div className='ms-4'>
                    <Skeleton animation='wave' width={160} height={18} />
                    <Skeleton animation='wave' width={60} height={12} />
                </div>
            </div>

            <div className='me-4'>
                <Skeleton className='rounded-md' animation='wave' variant="rectangular" width={10} height={22} />
            </div>
        </div>
    );
};

export default ListCardSmallSkeleton;
