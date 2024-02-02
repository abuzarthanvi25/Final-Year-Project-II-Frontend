import { Avatar } from '@mui/material';
import React from 'react';

const UserAvatar = ({ src, name = '', isOnline = null, className, ...rest }) => {
  const hasProfileImage = src !== null && src !== undefined && src !== '';

  const getInitials = (fullName) => {
    const names = fullName.split(' ');
    return names
      .map((name) => name.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <div className='relative'>
      <Avatar
        {...rest}
        sizes='large'
        src={hasProfileImage ? src : 'undefined'}
        alt={name}
        className={`shadow-lg shadow-blue-gray-500/25 ${className}`}
      >
        {!hasProfileImage && getInitials(name)}
      </Avatar>
      {
        isOnline !== null && <div style={{height: '14px', width:'14px'}} className={`border-2 ${isOnline ? "bg-green-500" : "bg-gray-500"} absolute -bottom-1 right-0 rounded-xl`}></div>
      }
    </div>
  );
};

export default UserAvatar;
