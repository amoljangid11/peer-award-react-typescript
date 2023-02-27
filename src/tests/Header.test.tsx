import { render, screen, within } from '@testing-library/react';
import Header from '../components/layout/Header';
import { CURRENCY } from '../config';

const user = { email: 'u@g.co', firstname: 'Te', lastname: 'Ko', image: 'alex_mayers.jpg' };
const fullname = `${user.firstname} ${user.lastname}`;
const received = 100;
const given = 50;

describe('Header', () => {
  test('renders user info and reward', () => {
    render(<Header user={user} received={received} given={given} />);
    const banner = screen.getByRole('banner');
    expect(within(banner).getByTestId('received')).toHaveTextContent(CURRENCY + received);
    expect(within(banner).getByTestId('given')).toHaveTextContent(CURRENCY + given);
    expect(within(banner).getByTestId('username')).toHaveTextContent(fullname);
    expect(within(banner).getByRole('img', { name: /avatar/i })).toBeInTheDocument();
  });
});
