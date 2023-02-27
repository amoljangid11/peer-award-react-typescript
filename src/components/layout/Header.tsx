import React from 'react';
import Profile from './Profile';
import Spinner from '../shared/Spinner';
import useStyles from './Header.style';
import { IUser } from '../../types';

type HeaderProps = {
  user: IUser;
  received: number;
  given: number;
};

const Header = ({ user, received, given }: HeaderProps): JSX.Element => {
  const classes = useStyles();

  if (!user.firstname) return <Spinner />;
  return (
    <header className={classes.header}>
      <Profile user={user} received={received} given={given} />
    </header>
  );
};

export default Header;
