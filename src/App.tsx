import { CssBaseline, ThemeProvider, Typography } from '@mui/material';
import { HashRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { AllRoutes } from './Routes';
import AuthProvider from './components/Auth/auth';
import useWindowSize from './hooks/useWindowSize';
import './index.css';
import { customTheme } from './themes';

function App() {
  const { isMobile } = useWindowSize();
  return (
    <>
      {isMobile ? (
        <Typography>Este sistema não é compativel para dispositivos mobile</Typography>
      ) : (
        <ThemeProvider theme={customTheme}>
          <HashRouter>
            <AuthProvider>
              <ToastContainer position='bottom-center' autoClose={3000} draggable theme='dark' />
              <AllRoutes />
            </AuthProvider>
          </HashRouter>
          <CssBaseline />
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
