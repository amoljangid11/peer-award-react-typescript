import { cleanup, screen } from '@testing-library/react';
import { renderRoute } from './testUtils';

afterEach(cleanup);

const user = '{"email":"u1@gmail.com","firstname":"Alex","lastname":"Mayers"}';
const rewards = `[{"id": 6,"from": ${user},"to": ${user},"reward": 5,"datetime": "2021-06-19T11:15:14.856Z","message": "Thanks"}]`;

describe('App', () => {
  test('renders Spinner when loading', () => {
    renderRoute('/');
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  test('renders Feed page on load', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce(Promise.resolve(new Response(rewards)))
      .mockResolvedValueOnce(Promise.resolve(new Response(user)));

    renderRoute('/');
    const addRewardButton = await screen.findByRole('button', { name: /add reward/i });
    expect(addRewardButton).toBeInTheDocument();
    expect(window.location.pathname).toEqual('/feed');
  });

  test('renders 404 page if page is unknown', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce(Promise.resolve(new Response(rewards)))
      .mockResolvedValueOnce(Promise.resolve(new Response(user)));

    renderRoute('/test_page_not_in_routes');
    const pageNotFound = await screen.findByRole('heading', { name: /404\. page is not found/i });
    expect(pageNotFound).toBeInTheDocument();
    expect(window.location.pathname).toEqual('/test_page_not_in_routes');
  });
});
