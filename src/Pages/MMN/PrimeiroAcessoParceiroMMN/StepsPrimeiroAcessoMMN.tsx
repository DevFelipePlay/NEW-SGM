import {
  Box,
  Stack,
  Step,
  StepConnector,
  StepIconProps,
  StepLabel,
  Stepper,
  stepConnectorClasses,
  styled,
} from '@mui/material';
import { FaUser } from 'react-icons/fa';

import 'swiper/css';

import { ReactElement, useEffect, useState } from 'react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { MdOutlineMultipleStop } from 'react-icons/md';
import { DefaultContainer } from '../../../components';

interface IStepsCadastro {
  step?: number;
  children?: ReactElement;
}

export function StepsPrimeiroAcessoMMN({ step, children }: IStepsCadastro) {
  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,#0FFF0750 50%,rgb(138,35,135) 100%)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,#0FFF0750 50%,rgb(138,35,135) 100%)',
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
        'linear-gradient( 136deg, rgb(242,113,33) 0%, #0FFF0750 50%, rgb(138,35,135) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, #0FFF0750 50%, rgb(138,35,135) 100%)',
    }),
  }));

  function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
      1: <FaUser />,
      2: <MdOutlineMultipleStop />,
      3: <MdOutlineMultipleStop />,
      4: <MdOutlineMultipleStop />,
      5: <MdOutlineMultipleStop />,
      6: <MdOutlineMultipleStop />,
      7: <MdOutlineMultipleStop />,
      8: <MdOutlineMultipleStop />,
      9: <MdOutlineMultipleStop />,
      10: <MdOutlineMultipleStop />,
      11: <MdOutlineMultipleStop />,
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
    'Cadastre os pacotes de licenciamento e venda de chips',
    'Cadastro de pacotes de Chips',
    'Cadastro dos planos',
    'Cadastro das Graduações',
    'Cadastro dos pontos por modalidade',
    'Cadastro de destribuição de valores por recarga ',
    'Cadastro de destribuição de valores por Ativação ',
    'Cadastro de destribuição de valores por Licenciamento ',
    'Cadastro de destribuição de valores por Pacote de Chips ',
    'Cadastro de taxas de saque e valores',
    'Cadastro de prêmios',
  ];

  /////// function step /////

  return (
    <DefaultContainer
      page={'Cadastro Primeiro Acesso MMN'}
      title={'Cadastro'}
      subTitle={'Primeiras configurações do seu modulo'}
      showSearch={false}
      showAvatar={true}
    >
      <Box
        sx={{
          width: '100%',
          mb: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
      <div>
        {isStackVisible && (
          <Stack
            sx={{
              width: '100%',
              mb: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            spacing={4}
          >
            <Stepper alternativeLabel activeStep={step} connector={<ColorlibConnector />}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>
        )}
      </div>
    </DefaultContainer>
  );
}
