import React, { useEffect, useState, useMemo } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import Header from './Header';
import Navbar from './Navbar';
import Spinner from '../shared/Spinner';
import Feed from '../../pages/Feed';
import ReceivedRewards from '../../pages/ReceivedRewards';
import GivenRewards from '../../pages/GivenRewards';
import Container from '@material-ui/core/Container';
import { useUser } from '../providers/AuthProvider';
import { fetchJSON } from '../../utils';
import { IReward, IRewardForm } from '../../types';
import useStyles from './Content.style';

const Page404 = React.lazy(() => import('../../pages/Page404'));

const Content = (): JSX.Element => {
  const classes = useStyles();
  const user = useUser();
  const [rewards, setRewards] = useState([] as IReward[]);

  const [receivedRewards, givenRewards, totalReceived, totalGiven] = useMemo(() => {
    if (!user.email || !rewards.length) return [[], [], 0, 0];
    const receivedRewards = rewards.filter((reward) => reward.to.email === user.email);
    const givenRewards = rewards.filter((reward) => reward.from.email === user.email);
    const totalReceived = receivedRewards.reduce((total, value) => (total += value.reward), 0);
    const totalGiven = givenRewards.reduce((total, value) => (total += value.reward), 0);
    return [receivedRewards, givenRewards, totalReceived, totalGiven];
  }, [rewards, user.email]);

  const addReward = (rewardData: IRewardForm) => {
    const { from, to, reward, message } = rewardData;
    if (!to) return;

    const id = rewards.length;
    const datetime = new Date().toISOString();
    const newReward: IReward = { id, from, to, reward, message, datetime };

    setRewards((rewards) => [newReward, ...rewards]);
  };

  useEffect(() => {
    fetchJSON('/mockups/rewards.json', (json) => setRewards(json));
  }, []);

  if (!user.email || !rewards.length) return <Spinner />;
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Header user={user} received={totalReceived} given={totalGiven} />
      <Navbar addReward={addReward} />
      <main className={classes.main}>
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className={classes.switch}
        >
          <Redirect exact from="/" to="/feed" />
          <Route path="/feed">
            <Feed rewards={rewards} />
          </Route>
          <Route path="/rewards/received">
            <ReceivedRewards rewards={receivedRewards} />
          </Route>
          <Route path="/rewards/given">
            <GivenRewards rewards={givenRewards} />
          </Route>
          <Route path="/*" component={Page404} />
        </AnimatedSwitch>
      </main>
    </Container>
  );
};

export default Content;
