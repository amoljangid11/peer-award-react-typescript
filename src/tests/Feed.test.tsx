import { cleanup, screen, within } from '@testing-library/react';
import { renderRoute } from './testUtils';

afterEach(cleanup);

const user = '{"email":"u1@gmail.com","firstname":"Alex","lastname":"Mayers"}';
const user2 = '{"email":"u2@gmail.com","firstname":"Max","lastname":"Loyer"}';
const user3 = '{"email":"u3@gmail.com","firstname":"Peter","lastname":"Weiss"}';
const rewards = `[
  {"id": 0,"from": ${user},"to": ${user2},"reward": 5,"datetime": "2021-06-19T11:15:14.856Z","message": "Thanks0"},
  {"id": 1,"from": ${user2},"to": ${user},"reward": 10,"datetime": "2021-06-19T11:15:14.856Z","message": "Thanks1"},
  {"id": 2,"from": ${user2},"to": ${user3},"reward": 15,"datetime": "2021-06-19T11:15:14.856Z","message": "Thanks2"}
]`;
const rewardsNumber = 3;

describe('Feed page', () => {
  test('lists all rewards', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce(Promise.resolve(new Response(rewards)))
      .mockResolvedValueOnce(Promise.resolve(new Response(user)));

    renderRoute('/feed');
    const addRewardButton = await screen.findByRole('button', { name: /add reward/i });
    expect(addRewardButton).toBeInTheDocument();
    expect(window.location.pathname).toEqual('/feed');

    const list = screen.getByRole('list');
    expect(within(list).getAllByRole('listitem')).toHaveLength(rewardsNumber);
  });
});
