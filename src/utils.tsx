import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { IUser } from './types';

export const getFullName = (user: IUser): string => `${user.firstname} ${user.lastname}`;

export const getInitials = (user: IUser): string => {
  const { firstname, lastname } = user;
  if (firstname?.length && lastname?.length) return `${firstname[0]}${lastname[0]}`.toUpperCase();
  if (firstname?.length) return firstname.slice(0, 2);
  if (lastname?.length) return lastname.slice(0, 2);
  return '';
};

export const fetchJSON = (url: string, callback: (json: any) => void) => {
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error('Network error ' + res.status);
      return res.json();
    })
    .then((json) => callback(json))
    .catch((err) => console.error(err));
};

dayjs.extend(relativeTime);
export const getRelativeDate = (date: string) => dayjs().to(dayjs(date));
