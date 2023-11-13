import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { IoReload, IoReturnUpBackSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const actions = [
  { icon: <IoReturnUpBackSharp />, name: 'Voltar' },
  { icon: <IoReload />, name: 'Atualizar Dados' },
];

export function BotaoAcoes() {
  const history = useNavigate();

  return (
    <SpeedDial
      ariaLabel='SpeedDial basic example'
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          sx={{ height: '42px', width: '42px', fontSize: '1.25rem' }}
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => {
            action.name === 'Voltar' ? history(-1) : null;
            action.name === 'Atualizar Dados' ? window.location.reload() : null;
          }}
        />
      ))}
    </SpeedDial>
  );
}
