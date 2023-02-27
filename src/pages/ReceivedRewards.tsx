import React from 'react';
import { List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import UserAvatar from '../components/shared/UserAvatar';
import { getFullName, getRelativeDate } from '../utils';
import { CURRENCY } from '../config';
import { IReward } from '../types';
import useStyles from './List.style';

const ReceivedRewards = ({ rewards }: { rewards: IReward[] }): JSX.Element => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      {rewards.map(({ id, from, reward, datetime, message }) => {
        const rewarder = getFullName(from);
        const date = getRelativeDate(datetime);

        return (
          <ListItem key={id}>
            <ListItemAvatar>
              <UserAvatar user={from} />
            </ListItemAvatar>
            <ListItemText
              primary={message}
              secondary={
                <span>
                  {'You are rewarded '}
                  <b>
                    {CURRENCY}
                    {reward}
                  </b>
                  {` by ${rewarder} ${date}`}
                </span>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default ReceivedRewards;
