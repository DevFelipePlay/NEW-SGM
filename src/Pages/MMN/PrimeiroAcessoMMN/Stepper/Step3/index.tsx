import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Grid, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Cards } from '../../../../../components';

interface Graduation {
  nome: string;
  porcentagem: number;
  meta: number;
}

const Step3: React.FC = () => {
  const [graduations, setGraduations] = useState<Graduation[]>([
    { nome: '', porcentagem: 0, meta: 0 },
  ]);

  const handleAddGraduation = () => {
    setGraduations([...graduations, { nome: '', porcentagem: 0, meta: 0 }]);
  };

  const handleRemoveGraduation = (index: number) => {
    const updatedGraduations = graduations.filter((_, i) => i !== index);
    setGraduations(updatedGraduations);
  };

  const handleInputChange = (
    index: number,
    field: 'nome' | 'porcentagem' | 'meta',
    value: string | number
  ) => {
    const updatedGraduations = graduations.map((graduation, i) => {
      if (i === index) {
        return {
          ...graduation,
          [field]: field === 'porcentagem' || field === 'meta' ? +value : value,
        };
      }
      return graduation;
    });
    setGraduations(updatedGraduations);
  };

  return (
    <Cards title={'Graduações'} subTitle={'Cadastre as graduações para os usuários'} size={'80%'}>
      {graduations.map((graduation, index) => (
        <Grid
          container
          spacing={2}
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Grid item xs={4} sx={{ mb: 4 }}>
            <TextField
              label='Nome da graduação'
              variant='standard'
              fullWidth
              value={graduation.nome}
              onChange={(e) => handleInputChange(index, 'nome', e.target.value)}
            />
          </Grid>
          <Grid item xs={3} sx={{ mb: 4 }}>
            <TextField
              label='Porcentagem'
              variant='standard'
              fullWidth
              type='number'
              value={graduation.porcentagem}
              onChange={(e) => handleInputChange(index, 'porcentagem', e.target.value)}
            />
          </Grid>
          <Grid item xs={3} sx={{ mb: 4 }}>
            <TextField
              label='Meta para a próxima graduação'
              variant='standard'
              fullWidth
              type='number'
              value={graduation.meta}
              onChange={(e) => handleInputChange(index, 'meta', e.target.value)}
            />
          </Grid>
          <Grid item xs={2} sx={{ mb: 4 }}>
            <IconButton color='error' onClick={() => handleRemoveGraduation(index)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Box mt={2}>
        <Button onClick={handleAddGraduation}>Adicionar</Button>
      </Box>
    </Cards>
  );
};

export default Step3;
