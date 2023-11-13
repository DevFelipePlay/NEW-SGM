import { CssBaseline, ThemeProvider } from '@mui/material';
import { HashRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { AllRoutes } from './Routes';
import AuthProvider from './auth/auth';
import './index.css';
import { customTheme } from './themes';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <HashRouter>
        <AuthProvider>
          <ToastContainer position='bottom-center' autoClose={500} draggable theme='dark' />
          <AllRoutes />
        </AuthProvider>
      </HashRouter>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
