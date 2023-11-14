import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { Cards, Dropzone } from '../../../../../components';

export default function Step6() {
  const [selectedValue, setSelectedValue] = useState('0');
  const [files, setFiles] = useState<Blob[]>([]);

  const handleRadioChange = (e: any) => {
    setSelectedValue(e.target.value);
  };

  return (
    <Cards title={'Premiações'} subTitle={'Cadastre os premios e as suas metas'} size={'50%'}>
      <FormControl>
        <Typography variant='h5'>Escolha o metodo que deseja cadastrar a premiação</Typography>
        <RadioGroup
          aria-labelledby='demo-radio-buttons-group-label'
          value={selectedValue}
          name='radio-buttons-group'
          onChange={handleRadioChange}
        >
          <FormControlLabel value={'0'} control={<Radio />} label='Premio em dinheiro' />
          <FormControlLabel value={'1'} control={<Radio />} label='Premio em itens' />
          <FormControlLabel value={'2'} control={<Radio />} label='Ambas opções' />
        </RadioGroup>
      </FormControl>
      <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--primary-color)' }} />
      <>
        {selectedValue === '0' && (
          <Box sx={{ my: 2 }}>
            <Typography>Premio em dinheiro</Typography>
            <TextField
              label='Valor do premio'
              variant='standard'
              fullWidth
              type='tel'
              sx={{ mb: 2 }}
            />
            <TextField
              label='Meta em pontos'
              variant='standard'
              fullWidth
              type='tel'
              sx={{ mb: 2 }}
            />
            <TextField label='Descrição' variant='standard' fullWidth type='tel' sx={{ mb: 2 }} />
          </Box>
        )}
        {selectedValue === '1' && (
          <Box sx={{ my: 2 }}>
            <Typography variant='h5'>Premio em Itens</Typography>
            <TextField
              label='Valor do premio'
              variant='standard'
              fullWidth
              type='tel'
              sx={{ mb: 2 }}
            />
            <TextField
              label='Meta em pontos'
              variant='standard'
              fullWidth
              type='tel'
              sx={{ mb: 2 }}
            />
            <Box sx={{ my: 2 }}>
              <Typography>Adicione fotos dos itens no campo abaixo</Typography>
              <Dropzone
                accept={{
                  'application/vnd.ms-excel': ['.xls'],
                  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                }}
                onDrop={(files) => {
                  setFiles(files);
                }}
              />
            </Box>

            <TextField label='Descrição' variant='standard' fullWidth type='tel' sx={{ mb: 2 }} />
          </Box>
        )}
        {selectedValue === '2' && (
          <>
            <Box sx={{ my: 2 }}>
              <Typography variant='h5'>Premio em dinheiro</Typography>
              <TextField
                label='Valor do premio'
                variant='standard'
                fullWidth
                type='tel'
                sx={{ mb: 2 }}
              />
              <TextField
                label='Meta em pontos'
                variant='standard'
                fullWidth
                type='tel'
                sx={{ mb: 2 }}
              />
              <TextField label='Descrição' variant='standard' fullWidth type='tel' sx={{ mb: 2 }} />
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography variant='h5'>Premio em Itens</Typography>
              <TextField
                label='Valor do premio'
                variant='standard'
                fullWidth
                type='tel'
                sx={{ mb: 2 }}
              />
              <TextField
                label='Meta em pontos'
                variant='standard'
                fullWidth
                type='tel'
                sx={{ mb: 2 }}
              />
              <Box sx={{ my: 2 }}>
                <Dropzone
                  accept={{
                    'application/vnd.ms-excel': ['.xls'],
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                  }}
                  onDrop={(files) => {
                    setFiles(files);
                  }}
                />
              </Box>

              <TextField label='Descrição' variant='standard' fullWidth type='tel' sx={{ mb: 2 }} />
            </Box>
          </>
        )}
        <Button onClick={() => ''}>Cadastrar</Button>
      </>
    </Cards>
  );
}
