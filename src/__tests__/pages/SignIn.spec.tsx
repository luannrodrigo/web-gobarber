import React from 'react';
import {
  render, fireEvent, waitFor,
} from '@testing-library/react';
import SignIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn(); // para saber se a função foi disparada

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockedHistoryPush,
  }),
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('../../hooks/auth', () => ({
  useAuth: () => ({
    signIn: jest.fn(),
  }),
}));

jest.mock('../../hooks/toast', () => ({
  useToast: () => ({
    addToast: jest.fn(),
  }),
}));

describe('SignIn Page', () => {
  it('should be able to SignIn', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'luann@gmail.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });
});
