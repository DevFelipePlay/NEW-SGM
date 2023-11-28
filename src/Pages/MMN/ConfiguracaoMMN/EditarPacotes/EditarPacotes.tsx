import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Grid, InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  IResPostPlayRecuperaPacotesLicenciamento,
  postPlayRecuperaPacotesLicenciamento,
} from '../../../../api';
import { Cards } from '../../../../components';
import useUser from '../../../../hooks/useUser';

export function EditarPacotes() {
  const [loading, setloading] = useState(false);
  const [editedValues, setEditedValues] = useState<{
    [key: number]: Partial<IResPostPlayRecuperaPacotesLicenciamento>;
  }>({});
  const [responsePacotes, setResponsePacotes] = useState<
    IResPostPlayRecuperaPacotesLicenciamento[]
  >([]);
  const { user } = useUser();
  const [numCards, setNumCards] = useState(1);

  async function handleRecuperaPacotes() {
    let payload = {
      token: user?.token ? user.token : '',
    };

    try {
      const data = await postPlayRecuperaPacotesLicenciamento(payload);
      setResponsePacotes(data);
    } catch (error) {}
  }

  const handleEditChange = (index: number, field: string, value: any) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [index]: {
        ...prevValues[index],
        [field]: value,
      },
    }));
  };

  // const handleDelete = (index: number) => {
  //   setResponsePacotes((prevPacotes) => {
  //     const updatedPacotes = [...prevPacotes];
  //     updatedPacotes.splice(index, 1);
  //     return updatedPacotes;
  //   });
  // };

  useEffect(() => {
    handleRecuperaPacotes();
  }, []);

  return (
    <Grid
      container
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      component={'form'}
      onSubmit={() => ''}
    >
      {responsePacotes.map((item, index) => (
        <Grid item xs={8}>
          <Cards
            key={index}
            title={item.nome}
            subTitle={'Cadastre os dados dos seus pacotes de costumizaveis'}
            size={'100%'}
          >
            <TextField
              variant='standard'
              label={'Nome'}
              value={
                editedValues[index]?.nome !== undefined ? editedValues[index]?.nome : item.nome
              }
              onChange={(e) => handleEditChange(index, 'nome', e.target.value)}
              helperText={'Escolha um nome para o pacote, este nome será mostrado para os usuárips'}
              sx={{ mb: 2 }}
              fullWidth
              required
            />
            <TextField
              variant='standard'
              label={'Chips'}
              type='tel'
              value={
                editedValues[index]?.chips !== undefined ? editedValues[index]?.chips : item?.chips
              }
              onChange={(e) => handleEditChange(index, 'chips', e.target.value)}
              helperText={'Escolha a quantidade de chips que será oferecido pra este pacote'}
              fullWidth
              sx={{ mb: 2 }}
              required
            />
            <TextField
              variant='standard'
              label={'Pontos'}
              type='tel'
              value={
                editedValues[index]?.pontos !== undefined
                  ? editedValues[index]?.pontos
                  : item?.pontos
              }
              onChange={(e) => handleEditChange(index, 'pontos', e.target.value)}
              helperText={
                'Defina a quantidade de pontos que cada venda deste modulo irá gerar para os usuários'
              }
              sx={{ mb: 2 }}
              fullWidth
              required
            />
            <TextField
              type='tel'
              id='id_valor_plano'
              label='Valor de venda'
              placeholder='0,00'
              value={
                editedValues[index]?.valor_venda !== undefined
                  ? editedValues[index]?.valor_venda
                  : item?.valor_venda
              }
              onChange={(e) => handleEditChange(index, 'valor_venda', e.target.value)}
              variant='standard'
              fullWidth
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: <InputAdornment position='start'>R$</InputAdornment>,
              }}
            />

            {/* <IconButton color='error' onChange={() => handleDelete(index)} disabled>
            <TbTrashX />
          </IconButton> */}
          </Cards>
        </Grid>
      ))}

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', mb: 2 }}>
        <LoadingButton type='submit' variant='contained' loading={loading}>
          Salvar
        </LoadingButton>
      </Box>
    </Grid>
  );
}
