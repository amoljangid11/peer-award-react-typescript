import React from 'react';
import { Avatar } from '@material-ui/core';
import { IUser } from '../../types';
import { AVATAR_PATH } from '../../config';
import { getInitials } from '../../utils';
import useStyles from './UserAvatar.style';

type UserAvatarProps = {
  user: IUser;
  size?: 'big' | 'small' | 'smaller';
};

const UserAvatar = ({ user, size = 'small' }: UserAvatarProps): JSX.Element => {
  const classes = useStyles();
  const { image } = user;

  if (image) return <Avatar alt="avatar" src={AVATAR_PATH + image} className={classes[size]} />;
  return (
    <Avatar alt="avatar" className={classes[size]}>
      {getInitials(user)}
    </Avatar>
  );
};

export default UserAvatar;
