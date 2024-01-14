import { Avatar } from '@mui/material';
import React from 'react';

const UserAvatar = ({ src, name = '', className, ...rest }) => {
  const hasProfileImage = src !== null && src !== undefined && src !== '';

  const getInitials = (fullName) => {
    const names = fullName.split(' ');
    return names
      .map((name) => name.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <Avatar
      {...rest}
      sizes='large'
      src={hasProfileImage ? src : 'undefined'}
      alt={name}
      variant="rounded"
      className={`shadow-lg shadow-blue-gray-500/25 ${className}`}
    >
      {!hasProfileImage && getInitials(name)}
    </Avatar>
  );
};

export default UserAvatar;
