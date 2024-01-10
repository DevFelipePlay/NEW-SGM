import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';

interface IPlanosProps {
  setTitle: (title: string) => void;
  setSubtitle: (title: string) => void;
}

const plans = [
  {
    valor: '29,90',
    minValor: '24,41',
    nome: '(Start) 6Gb + 100 Minutos + 60 sms',
    internet: 6,
    minutos: 100,
    sms: 60,
    mostraApp: true,
  },
  {
    valor: '26,66',
    minValor: '24,41',
    nome: '(Start) 8Gb +  Minutos Ilimitados + 100 sms + 1 Gb Portabilidade',
    internet: 8,
    minutos: 'Ilimitado',
    sms: 100,
    mostraApp: true,
  },
  {
    valor: '32,71',
    minValor: '24,41',
    nome: '(Start) 14Gb +  Minutos Ilimitados + 100 sms + 1 Gb Portabilidade',
    internet: 14,
    minutos: 'Ilimitado',
    sms: 100,
    mostraApp: true,
  },
];

const currencies = [
  {
    value: 'plano1',
    label: `${plans[0].nome} | R$ ${plans[0].valor}`,
  },
  {
    value: 'plano2',
    label: `${plans[1].nome} | R$ ${plans[1].valor}`,
  },
  {
    value: 'plano3',
    label: `${plans[2].nome} | R$ ${plans[2].valor}`,
  },
];

export default function Planos({ setTitle, setSubtitle }: IPlanosProps) {
  setTitle('Planos');
  setSubtitle('Gerencie os planos do parceiro selecionado.');

  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedPlanValor, setSelectedPlanValor] = useState('');
  const [selectedPlanNome, setSelectedPlanNome] = useState('');

  return (
    <>
      <Box
        sx={{
          width: '85%',
          boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
          padding: '50px',
          my: 6,
        }}
      >
        <Box>
          <Typography variant='h3' fontWeight='700' mb={5}>
            Criar Plano
          </Typography>
          <TextField
            sx={{
              mb: 2.5,
            }}
            id='outlined-select-currency'
            select
            label='Planos'
            value={selectedPlan}
            onChange={(e) => {
              const selectedValue = e.target.value;
              setSelectedPlan(selectedValue);
              const selectedPlanIndex = currencies.findIndex(
                (currency) => currency.value === selectedValue
              );
              setSelectedPlanValor(plans[selectedPlanIndex].valor);
              setSelectedPlanNome(plans[selectedPlanIndex].nome);
            }}
            fullWidth
          >
            {currencies.map((option) => (
              <MenuItem sx={{ width: '100%' }} key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Box display={'flex'} gap={2} mb={2.5}>
            <TextField
              label='Valor do Plano'
              id='outlined-start-adornment'
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position='start'>R$</InputAdornment>,
              }}
              value={selectedPlanValor}
              onChange={(e) => setSelectedPlanValor(e.target.value)}
            ></TextField>
            <TextField
              id='outlined-basic'
              label='Nome do Plano'
              variant='outlined'
              fullWidth
              value={selectedPlanNome}
              onChange={(e) => setSelectedPlanNome(e.target.value)}
            />
          </Box>

          <FormGroup
            sx={{
              mb: 3,
            }}
          >
            <FormControlLabel control={<Switch />} label='Mostrar no App' />
          </FormGroup>
          <Button variant='contained'>Criar</Button>
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          padding: '20px',
          background: '#fafafa',
          display: 'flex',
          gap: 5,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {plans.map((item) => (
          <CardPlano
            nomePlano={`${item.nome}`}
            valorPlano={`${item.valor}`}
            minValorPlano={`${item.minValor}`}
            internet={`${item.internet}`}
            minutos={`${item.minutos}`}
            sms={`${item.sms}`}
          />
        ))}
      </Box>
    </>
  );
}

interface ICardPlanoProps {
  nomePlano: string;
  valorPlano: string;
  minValorPlano: string;
  internet: string;
  minutos: string;
  sms: string;
}

function CardPlano({
  nomePlano,
  valorPlano,
  minValorPlano,
  internet,
  minutos,
  sms,
}: ICardPlanoProps) {
  const [isEditable, setIsEditable] = useState(false);
  const [buttonText, setButtonText] = useState('Editar');
  const [nomePlanoInput, setNomePlanoInput] = useState(nomePlano);
  const [valorPlanoInput, setValorPlanoInput] = useState(valorPlano);

  const handleClick = () => {
    setIsEditable(!isEditable);
    setButtonText(isEditable ? 'Editar' : 'Salvar');
  };

  return (
    <Box
      sx={{
        width: '325px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0px 4px 6px 0px rgba(0, 0, 0, 0.25)',
        background: '#fff',
        borderRadius: '4px',
      }}
    >
      {isEditable && (
        <Typography
          variant='subtitle2'
          color='error'
          fontWeight={700}
          fontSize={12}
          mb={1}
          textAlign={'center'}
        >
          Este plano está em modo de edição.
        </Typography>
      )}
      <TextField
        id='standard-basic'
        variant='standard'
        value={`${nomePlanoInput}`}
        onChange={(e) => setNomePlanoInput(e.target.value)}
        style={{ color: 'red' }}
        sx={{
          fontWeight: '700',
        }}
        InputProps={{
          style: {
            fontWeight: '700',
            fontSize: '1.25rem',
          }, // Aplicar border-radius aqui
        }}
        disabled={!isEditable ? true : false}
      />
      <TextField
        id='standard-basic'
        variant='standard'
        value={`${valorPlanoInput}`}
        onChange={(e) => setValorPlanoInput(e.target.value)}
        style={{ color: 'red' }}
        sx={{
          mt: 3,
        }}
        InputProps={{
          sx: {
            fontWeight: '700',
            fontSize: '1.75rem',
            color: 'var(--primary_color)',
          }, // Aplicar border-radius aqui
          startAdornment: (
            <Typography
              sx={{
                fontSize: '1.75rem',
                fontWeight: '700',
                mb: 0.15,
                mr: 1,
              }}
            >
              R$
            </Typography>
          ),
        }}
        disabled={!isEditable ? true : false}
      />

      <Typography
        variant='subtitle2'
        color={'#a6a6a6'}
        fontSize={12}
        mt={1}
      >{`Mínimo: R$ ${minValorPlano}`}</Typography>
      <Box
        component={'ul'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        mt={1}
      >
        <Typography
          component={'li'}
          fontWeight={700}
          variant='subtitle1'
        >{`Internet: ${internet} GB`}</Typography>
        <Typography component={'li'} variant='subtitle1'>{`Minutos: ${minutos}`}</Typography>
        <Typography component={'li'} variant='subtitle1'>{`SMS: ${sms}`}</Typography>
      </Box>

      <FormControlLabel
        sx={{
          my: 2,
          mx: 'auto',
          textAlign: 'center',
        }}
        control={<Switch />}
        label='Mostrar no App'
        disabled={!isEditable ? true : false}
      />
      <Box display={'flex'} justifyContent={'center'} gap={3}>
        <Button variant='contained' onClick={handleClick}>
          {buttonText}
        </Button>

        <Button
          variant='contained'
          sx={{
            backgroundColor: 'red',
          }}
        >
          Excluir
        </Button>
      </Box>
    </Box>
  );
}
