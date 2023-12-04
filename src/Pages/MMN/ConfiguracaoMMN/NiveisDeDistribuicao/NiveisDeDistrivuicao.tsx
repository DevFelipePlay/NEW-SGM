import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useState } from 'react';
import { Cards } from '../../../../components';
import { NiveisDeDistribuicaoAtivacao } from './NiveisAtivacao';
import { NiveisDeDistribuicaoRecarga } from './NiveisRecarga';

export function NiveisDeDistribuicao() {
  const [selectedValue, setSelectedValue] = useState('');
  return (
    <Box sx={{ width: '100%' }}>
      <Cards title={'Configure os níveis de distribuição'} subTitle={' '} size={'100%'}>
        <FormControl>
          <FormLabel id='demo-radio-buttons-group-label'>
            Marque a ideal opção para o seu objetivo
          </FormLabel>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue={0}
            value={selectedValue}
            name='radio-buttons-group'
            onChange={(e: any) => setSelectedValue(e.target.value)}
          >
            <FormControlLabel value='0' control={<Radio />} label='Niveis Ativação' />
            <FormControlLabel value='1' control={<Radio />} label='Niveis Recarga' />
            <FormControlLabel value='2' control={<Radio />} label='Niveis Licenciamento' />
            <FormControlLabel value='3' control={<Radio />} label='Niveis Venda de chip' />
          </RadioGroup>
        </FormControl>
      </Cards>

      {selectedValue === '0' && <NiveisDeDistribuicaoAtivacao />}
      {selectedValue === '1' && <NiveisDeDistribuicaoRecarga />}
    </Box>
  );
}
