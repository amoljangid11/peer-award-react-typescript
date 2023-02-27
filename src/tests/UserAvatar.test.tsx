import { render, cleanup } from '@testing-library/react';
import UserAvatar from '../components/shared/UserAvatar';
import { AVATAR_PATH } from '../config';

const userWithImage = {
  email: 'u@g.co',
  firstname: 'Te',
  lastname: 'Ko',
  image: 'alex_mayers.jpg',
};
const userWithoutImage = { email: 'u@g.co', firstname: 'Te', lastname: 'Ko' };
const initials = userWithoutImage.firstname[0] + userWithoutImage.lastname[0];
const small = { width: '40px', height: '40px' };

afterEach(cleanup);

describe('UserAvatar', () => {
  test('should render an image if provided', () => {
    const { container } = render(<UserAvatar user={userWithImage} />);

    const div = container.firstChild as ChildNode;
    expect(div).toBeInTheDocument();
    expect(div).toHaveStyle(small);

    const img = div.firstChild as ChildNode;
    expect(img).toBeInTheDocument();

    expect(img).toHaveAttribute('alt', 'avatar');
    expect(img).toHaveAttribute('src', AVATAR_PATH + userWithImage.image);
  });

  test('should render initials if image is not provided', () => {
    const { container } = render(<UserAvatar user={userWithoutImage} />);

    const div = container.firstChild as ChildNode;
    expect(div).toBeInTheDocument();
    expect(div).toHaveTextContent(initials);
  });
});
