import React from 'react';

import SingIn from './pages/SignIn';
// import SingUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import AuthContex from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthContex.Provider value={{ name: 'Luann' }}>

      <SingIn />
      {/* <SingUp /> */}
    </AuthContex.Provider>
    <GlobalStyle />
  </>
);
export default App;
