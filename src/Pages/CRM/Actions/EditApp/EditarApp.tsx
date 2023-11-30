import { Box, Button, FormControlLabel, FormGroup, Switch, TextField } from '@mui/material';
import { useState } from 'react';

interface IEditarDadosProps {
  setTitle: (title: string) => void;
  setSubtitle: (title: string) => void;
}

export default function EditarApp({ setTitle, setSubtitle }: IEditarDadosProps) {
  setTitle('Editar App');
  setSubtitle('Edite o visual e a versão do app.');

  const [isChecked, setIsChecked] = useState(false);

  function handleChange() {
    setIsChecked(!isChecked);
  }

  return (
    <Box
      sx={{
        width: '85%',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        padding: '50px',
        my: 6,
      }}
    >
      <Box>
        <TextField
          id='outlined-basic'
          label='Versão do App'
          variant='outlined'
          fullWidth
          sx={{
            mb: 2,
          }}
        />
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            justifyContent: 'space-between',
            mb: 2.5,
          }}
          width='100%'
        >
          <TextField
            id='outlined-basic'
            label='Cor Primária'
            variant='outlined'
            type='color'
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          {isChecked && (
            <TextField
              id='outlined-basic'
              label='Cor de Fundo'
              variant='outlined'
              type='color'
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        </Box>
        <FormGroup
          sx={{
            mb: 3,
          }}
        >
          <FormControlLabel
            control={<Switch />}
            onChange={handleChange}
            label='Dark / Light Mode'
          />
        </FormGroup>
        <Button variant='contained'>Editar</Button>
      </Box>
    </Box>
  );
}
