import React from 'react';
import { render } from '@testing-library/react';

import SignIn from '../../pages/SignIn';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
  Link: ({ children }: {children: React.ReactNode}) => children,
}));

describe('SigIn page', () => {
  it('should be able to sign In', () => {
    const { debug } = render(<SignIn />);

    debug();
  });
});
