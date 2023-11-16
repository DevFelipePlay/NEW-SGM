import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { Box, Button, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { TbTrashX } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { mask } from 'remask';
import {
  IReqPostPlayPctLicenciamento,
  postPlayPctLicenciamento,
} from '../../../../api/PctLicenciamento';
import { Cards, InputForMoney } from '../../../../components';
import { errorToast } from '../../../../utils';
import { StepsPrimeiroAcessoMMN } from '../StepsPrimeiroAcessoMMN';

export function CadastroDePacotesMMN() {
  const [cardData, setcardData] = useState<IReqPostPlayPctLicenciamento[]>([
    { nome: '', chips: '', pontos: '', valor_venda: '' },
  ]);
  const handleAddCard = () => {
    setcardData([...cardData, { nome: '', chips: '', pontos: '', valor_venda: '' }]);
  };

  const handleInputChanges = (index: any, key: any, value: any) => {
    const newCardData = [...cardData];
    //@ts-ignore
    newCardData[index][key] = value;
    setcardData(newCardData);
  };

  const handleDeleteCard = (index: number) => {
    const newCardData = [...cardData];
    newCardData.splice(index, 1);
    setcardData(newCardData);
  };

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    handleAddCard;
    try {
      const postData = cardData.map((card) => ({
        nome: card.nome,
        chips: card.chips,
        pontos: card.pontos,
        valor_venda: card.valor_venda,
      }));
      const postDataToken = {
        ...postData,
        token: 'eb6237632e72042f7ca7e2cdb25860025b1e670293bfae3e63',
      };
      await postPlayPctLicenciamento(postDataToken);
      toast.success('Pacotes cadastrados com sucesso');
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <StepsPrimeiroAcessoMMN step={0}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
        component={'form'}
        onSubmit={handleSubmit}
      >
        {cardData.map((card, index) => (
          <Cards
            key={index}
            title={'Pacote de licenciamento'}
            subTitle={'Cadastre os dados dos seus pacotes de costumizaveis'}
            size={'50%'}
          >
            <TextField
              variant='standard'
              label={'Nome'}
              value={card.nome}
              onChange={(e: any) => handleInputChanges(index, 'nome', e.target.value.trim())}
              helperText={'Escolha um nome para o pacote, este nome será mostrado para os usuárips'}
              sx={{ mb: 2 }}
            />
            <TextField
              variant='standard'
              label={'Chips'}
              value={mask(card.chips, '999')}
              type='tel'
              onChange={(e: any) => handleInputChanges(index, 'chips', e.target.value)}
              helperText={'Escolha a quantidade de chips que será oferecido pra este pacote'}
              sx={{ mb: 2 }}
            />
            <TextField
              variant='standard'
              label={'Pontos'}
              value={mask(card.pontos, '9999')}
              onChange={(e: any) => handleInputChanges(index, 'pontos', e.target.value)}
              type='tel'
              helperText={
                'Defina a quantidade de pontos que cada venda deste modulo irá gerar para os usuários'
              }
              sx={{ mb: 2 }}
            />
            <InputForMoney
              value={card.valor_venda}
              onChange={(value) =>
                handleInputChanges(index, 'valor_venda', value.replace(/[^0-9]/g, ''))
              }
            />
            {index !== 0 && (
              <IconButton color='error' onClick={() => handleDeleteCard(index)}>
                <TbTrashX />
              </IconButton>
            )}
          </Cards>
        ))}
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
          <Button onClick={handleAddCard}>Adicionar Pacote</Button>
          <LoadingButton type='submit' variant='contained' loading={loading}>
            Enviar
          </LoadingButton>
        </Box>
      </Box>
    </StepsPrimeiroAcessoMMN>
  );
}
