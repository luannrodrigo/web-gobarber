import React from 'react';

import SingIn from './pages/SignIn';
import GlobalStyle from './styles/global';

import AppProvider from './hooks/index';

const App: React.FC = () => (
  <>
    <AppProvider>
      <SingIn />
    </AppProvider>

    <GlobalStyle />
  </>
);
export default App;
