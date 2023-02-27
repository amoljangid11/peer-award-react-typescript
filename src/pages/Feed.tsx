import React from 'react';
import { List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import UserAvatar from '../components/shared/UserAvatar';
import useStyles from './List.style';
import { IReward } from '../types';
import { getFullName, getRelativeDate } from '../utils';

const Feed = ({ rewards }: { rewards: IReward[] }): JSX.Element => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      {rewards.map(({ id, from, to, datetime, message }) => {
        const rewarder = getFullName(from);
        const rewardee = getFullName(to);
        const date = getRelativeDate(datetime);

        return (
          <ListItem key={id}>
            <ListItemAvatar>
              <UserAvatar user={to} />
            </ListItemAvatar>
            <ListItemText
              primary={message}
              secondary={`${rewardee} rewarded by ${rewarder} ${date}`}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default Feed;
