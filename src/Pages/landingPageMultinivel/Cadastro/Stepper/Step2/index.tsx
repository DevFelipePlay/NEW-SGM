import { Box, Button, Modal, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { Cards } from '../../../../../components';

interface CustomTextFieldProps {
  label: string;
  required?: boolean;
  type: string;
}

function CustomTextField({ type, label, required = false, ...rest }: CustomTextFieldProps) {
  return (
    <TextField
      required={required}
      label={label}
      variant='standard'
      fullWidth
      sx={{ mb: 2 }}
      {...rest}
      type={type}
    />
  );
}

export default function Step2() {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleValidateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Cards
        title='Valide seu ICCID'
        subTitle='Insira seu ICCID para continuar'
        size={smDown ? '100%' : '50%'}
      >
        <CustomTextField label='Número ICCID' type='number' required />
        <CustomTextField label='MSSISDN' type='number' required />
        <Box>
          <Button onClick={handleValidateClick}>Validar</Button>
        </Box>
      </Cards>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id='modal-title' variant='h6' component='h2'>
            Erro na validação
          </Typography>
          <Typography id='modal-description' sx={{ mt: 2 }}>
            Sua validação falhou. Por favor, tente novamente.
          </Typography>
          <Button onClick={handleCloseModal}>Fechar</Button>
        </Box>
      </Modal>
    </>
  );
}
