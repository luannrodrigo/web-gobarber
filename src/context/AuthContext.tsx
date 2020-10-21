import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SingInCredentials {
  email: string;
  password: string;
}

interface AuthContexData {
  user: object;
  signIn(credentials: SingInCredentials): Promise<void>;
}

export const AuthContext = createContext<AuthContexData>(
  {} as AuthContexData,
);

export const AuthProvider: React.FC = ({ children }) => {
  // preenche os valores de data de acordo com o que esta no localstorage
  // pois se ja tiver os dados podemos já preencher os dados Data

  const [data, setData] = useState<AuthState >(() => {
    const token = localStorage.getItem('@GoBaber:token');
    const user = localStorage.getItem('@Gobaber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@GoBaber:token', token);
    localStorage.setItem('@Gobaber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      { children}
    </AuthContext.Provider>
  );
};
