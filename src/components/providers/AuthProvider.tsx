import React, { FC, useContext, useEffect, useState } from 'react';
import { IUser } from '../../types';
import { fetchJSON } from '../../utils';

export const AuthContext = React.createContext({} as IUser);

const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState({} as IUser);

  useEffect(() => {
    fetchJSON('/mockups/user.json', (json) => setUser(json));
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

const useUser = (): IUser => useContext(AuthContext);

export { AuthProvider, useUser };
