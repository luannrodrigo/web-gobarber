import React from 'react';

import SingIn from './pages/SignIn';
// import SingUp from './pages/SignUp';
import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <SingIn />
    {/* <SingUp /> */}
    <GlobalStyle />
  </>
);
export default App;
