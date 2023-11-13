import {
  Box,
  Button,
  Stack,
  Step,
  StepConnector,
  StepIconProps,
  StepLabel,
  Stepper,
  Typography,
  stepConnectorClasses,
  styled,
  useMediaQuery,
} from '@mui/material';
import { FaSimCard, FaUser } from 'react-icons/fa';
import { PiHandCoins } from 'react-icons/pi';

import 'swiper/css';

import { useTheme } from '@mui/material/styles';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { BiBox } from 'react-icons/bi';
import { GiCash } from 'react-icons/gi';
import Step1 from './Stepper/Step1';
import Step2 from './Stepper/Step2';
import Step3 from './Stepper/Step3';
import Step4 from './Stepper/Step4';
import Step5 from './Stepper/Step5';

export default function Cadastro() {
  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
  }));

  function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
      1: <FaUser />,
      2: <FaSimCard />,
      3: <PiHandCoins />,
      4: <BiBox />,
      5: <GiCash />,
    };

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }
  const [isStackVisible, setIsStackVisible] = useState(true); // Define o estado inicial como visível

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        setIsStackVisible(false);
      } else {
        setIsStackVisible(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const steps = [
    'Cadastre seus dados',
    'Valide seu ICCID',
    'Escolha seu Plano',
    'Compra dos Pack',
    'Dados financeiros',
  ];

  /////// function step /////

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const handleNext = () => {
    let newSkipped = skipped;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const navigate = useNavigate();

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: '#141414',
          p: {
            md: 10,
            sm: 5,
            xs: 2,
          },
          py: {
            xs: 5,
          },
          flexDirection: 'column',
          display: 'flex',
        }}
      >
        <Typography variant={`${smDown ? 'h4' : 'h2'}`} color='var(--primary-color)'>
          Cadastre-se
        </Typography>
        <Typography
          variant={`${smDown ? 'subtitle2' : 'subtitle1'}`}
          color='#ffffff'
          sx={{
            maxWidth: '400px',
          }}
        >
          cadastre aqui seu modulo multinivel
        </Typography>
      </Box>
      <Stack
        spacing={smDown ? 1 : 2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: smDown ? '20px' : '40px',
        }}
      >
        {activeStep === 0 && <Step1 />}
        {activeStep === 1 && <Step2 />}
        {activeStep === 2 && <Step3 />}
        {activeStep === 3 && <Step4 />}
        {activeStep === 4 && <Step5 />}
        <Box
          sx={{
            width: smDown ? '100%' : mdDown ? '100%' : '50%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: smDown ? 'column' : 'row',
            justifyContent: activeStep !== 0 ? 'space-between' : 'center',
            gap: 2,
            p: 2,
          }}
        >
          {activeStep !== 0 && (
            <Button size='medium' onClick={() => handleBack()}>
              Voltar
            </Button>
          )}
          {activeStep === 4 ? (
            <Button onClick={() => navigate('/home-admin-mmn')}>Finalizar Cadastro</Button>
          ) : (
            <Button size='medium' onClick={() => handleNext()}>
              Proximo
            </Button>
          )}
        </Box>
      </Stack>
      <div>
        {isStackVisible && (
          <Stack sx={{ width: '100%', mb: 10 }} spacing={4}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>
        )}
      </div>
    </Box>
  );
}
