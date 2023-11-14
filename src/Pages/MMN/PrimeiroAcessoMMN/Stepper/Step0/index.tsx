import { Box, Button, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { TbTrashX } from 'react-icons/tb';
import { Cards } from '../../../../../components';

interface ICard {
  nome: string;
  chips: string;
  pontos: string;
  valorVenda: string;
}

export default function Step0() {
  const [cardData, setcardData] = useState<ICard[]>([
    { nome: '', chips: '', pontos: '', valorVenda: '' },
  ]);
  const handleAddCard = () => {
    setcardData([...cardData, { nome: '', chips: '', pontos: '', valorVenda: '' }]);
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
  return (
    <>
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
            onChange={(e: any) => handleInputChanges(index, 'nome', e.target.value)}
            helperText={'Escolha um nome para o pacote, este nome será mostrado para os usuárips'}
            sx={{ mb: 2 }}
          ></TextField>
          <TextField
            variant='standard'
            label={'Chips'}
            value={card.chips}
            onChange={(e: any) => handleInputChanges(index, 'chips', e.target.value)}
            helperText={'Escolha a quantidade de chips que será oferecido pra este pacote'}
            sx={{ mb: 2 }}
          ></TextField>
          <TextField
            variant='standard'
            label={'Pontos'}
            value={card.pontos}
            onChange={(e: any) => handleInputChanges(index, 'pontos', e.target.value)}
            helperText={
              'Defina a quantidade de pontos que cada venda deste modulo irá gerar para os usuários'
            }
            sx={{ mb: 2 }}
          ></TextField>
          <TextField
            variant='standard'
            label={'Valor de venda'}
            value={card.valorVenda}
            onChange={(e: any) => handleInputChanges(index, 'valorVenda', e.target.value)}
            helperText={'Defina o valor que o modulo irá custar para os usuários'}
            sx={{ mb: 2 }}
            fullWidth
          ></TextField>
          {index !== 0 && (
            <IconButton color='error' onClick={() => handleDeleteCard(index)}>
              <TbTrashX />
            </IconButton>
          )}
        </Cards>
      ))}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
        <Button onClick={handleAddCard}>Adicionar Pacote</Button>
        <Button onClick={() => ''}>Enviar</Button>
      </Box>
    </>
  );
}
