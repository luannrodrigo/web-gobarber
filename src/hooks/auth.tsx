import React, {
  createContext, useCallback, useContext, useState,
} from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SingInCredentials {
  email: string;
  password: string;
}

interface AuthContexData {
  user: User;
  signIn(credentials: SingInCredentials): Promise<void>;
  singOut(): void;
}

const AuthContext = createContext<AuthContexData>(
  {} as AuthContexData,
);

const AuthProvider: React.FC = ({ children }) => {
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

  const singOut = useCallback(() => {
    localStorage.removeItem('@GoBaber:token');
    localStorage.removeItem('@Gobaber:user');

    setData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, singOut }}>
      { children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContexData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
