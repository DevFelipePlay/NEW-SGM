import { CssBaseline } from '@mui/material';
import { HashRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { AllRoutes } from './Routes';
import AuthProvider from './components/Auth/auth';
import './index.css';
import { TemaProvider } from './themes';

function App() {
  return (
    <>
      <TemaProvider>
        <HashRouter>
          <AuthProvider>
            <ToastContainer position='bottom-center' autoClose={3000} draggable theme='dark' />
            <AllRoutes />
          </AuthProvider>
        </HashRouter>
        <CssBaseline />
      </TemaProvider>
    </>
  );
}

export default App;
