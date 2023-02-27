import React from 'react';
import { Grid, Theme, Typography } from '@material-ui/core';
import { IUser } from '../../types';
import useStyles from './Profile.style';
import UserAvatar from '../shared/UserAvatar';
import { getFullName } from '../../utils';
import { CURRENCY } from '../../config';
import { useMediaQuery } from '@material-ui/core';

type ProfileProps = {
  user: IUser;
  received: number;
  given: number;
};

const Profile = ({ user, received, given }: ProfileProps): JSX.Element => {
  const classes = useStyles();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4} sm={3} md={2}>
          <UserAvatar user={user} size="big" />
          {!isMobile && (
            <Typography variant="body2" className={classes.fullName} data-testid="username">
              {getFullName(user)}
            </Typography>
          )}
        </Grid>

        <Grid item xs={4} sm={3} md={2}>
          <Typography variant="body1">Received</Typography>
          <Typography variant="h5" data-testid="received">
            {CURRENCY}
            {received}
          </Typography>
        </Grid>

        <Grid item xs={4} sm={3} md={2}>
          <Typography variant="body1">Given</Typography>
          <Typography variant="h5" data-testid="given">
            {CURRENCY}
            {given}
          </Typography>
        </Grid>
      </Grid>

      {isMobile && (
        <Typography variant="body2" data-testid="username">
          {getFullName(user)}
        </Typography>
      )}
    </>
  );
};

export default Profile;
