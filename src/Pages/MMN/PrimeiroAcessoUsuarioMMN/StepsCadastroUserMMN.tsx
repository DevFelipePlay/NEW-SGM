import {
  Stack,
  Step,
  StepConnector,
  StepIconProps,
  StepLabel,
  Stepper,
  stepConnectorClasses,
  styled,
} from '@mui/material';
import { PiHandCoins } from 'react-icons/pi';

import 'swiper/css';

import { ReactElement, useEffect, useState } from 'react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { BiBox } from 'react-icons/bi';
import { GiCash } from 'react-icons/gi';
import { MdOutlineMultipleStop } from 'react-icons/md';
import { DefaultContainer } from '../../../components';

interface IStepsCadastro {
  step?: number;
  children?: ReactElement;
}

export function StepsCadastroUserMMN({ step, children }: IStepsCadastro) {
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
      1: <MdOutlineMultipleStop />,
      2: <PiHandCoins />,
      3: <BiBox />,
      4: <GiCash />,
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
    'Escolha a melhor forma para seu modulo',
    'Escolha seu Plano',
    'Compre um pacote de licença',
    'Dados financeiros',
  ];

  /////// function step /////

  // const theme = useTheme();
  // const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <DefaultContainer
      page={'Primeiro Acesso do usuário'}
      title={'Bem vindo ao sistema multinivel!'}
      subTitle={'É um prazer te-lo conosco'}
      showSearch={false}
      showAvatar={true}
    >
      {children}
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
