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
} from '@mui/material';
import { FaSimCard } from 'react-icons/fa';
import { PiCrownSimpleBold, PiHandCoins } from 'react-icons/pi';

import 'swiper/css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { DefaultContainer } from '../../../../components';
import Step5 from './Step5';
import Step0 from './Stepper/Step0';
import Step1 from './Stepper/Step1';
import Step2 from './Stepper/Step2';
import Step3 from './Stepper/Step3';
import Step4 from './Stepper/Step4';
import Step6 from './Stepper/Step6';

export default function PrimeiroAcesso() {
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
      1: <FaSimCard />,
      2: <PiCrownSimpleBold />,
      3: <PiHandCoins />,
      4: <PiHandCoins />,
      5: <PiHandCoins />,
      6: <PiHandCoins />,
      7: <PiHandCoins />,
    };

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  const steps = [
    'Escolha seus Planos',
    'Cadastro das Graduações',
    'Defina o valor dos pontos',
    'Cadastre as premiações',
    'Valor de ativação de sim-Cards',
    'Valor de ativação de sim-Cards',
    'Valor de ativação de sim-Cards',
  ];

  /////// function step /////

  const [activeStep, setActiveStep] = useState(4);
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
  return (
    <DefaultContainer
      page={'Primeiro Acesso'}
      title={'Multinível'}
      subTitle={'Configure aqui o seu modulo multinível'}
      showSearch={true}
      showAvatar={true}
    >
      <Stack
        spacing={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          mt: 5,
        }}
      >
        <Typography variant='h5'>Cadastro do modulo Multinivel</Typography>
        {activeStep === 0 && <Step0 />}
        {activeStep === 1 && <Step1 />}
        {activeStep === 2 && <Step2 />}
        {activeStep === 3 && <Step3 />}
        {activeStep === 4 && <Step4 />}
        {activeStep === 5 && <Step5 />}
        {activeStep === 6 && <Step6 />}

        <Box
          sx={{
            width: '80%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: activeStep !== 0 ? 'space-between' : 'center',
            p: 2,
          }}
        >
          {activeStep !== 0 && (
            <Button size='medium' onClick={() => handleBack()}>
              Voltar
            </Button>
          )}
          {activeStep === 6 ? (
            <Button onClick={() => navigate('/home-admin-mmn')}>Finalizar Cadastro</Button>
          ) : (
            <Button size='medium' onClick={() => handleNext()}>
              Proximo
            </Button>
          )}
        </Box>
      </Stack>
      <Stack sx={{ width: '100%', mb: 10 }} spacing={4}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
    </DefaultContainer>
  );
}
