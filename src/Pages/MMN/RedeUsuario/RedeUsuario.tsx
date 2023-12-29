import { useState } from 'react';
import { Nivel1, Nivel10, Nivel2, Nivel3, Nivel4, Nivel5, Nivel6, Nivel7, Nivel8, Nivel9 } from '.';
import { CustomizedTabs, DefaultContainer } from '../../../components';
import useUser from '../../../hooks/useUser';

export function RedeUsuario() {
  const [tabValue, setTabValue] = useState(0);
  const { user } = useUser();
  console.log(tabValue);

  return (
    <DefaultContainer
      page={'Multinível'}
      title={'Rede'}
      subTitle={'Visualize a sua rede de usuários.'}
      showSearch={false}
      showAvatar={true}
    >
      {user?.licenciado ? (
        <CustomizedTabs
          value={tabValue}
          onChange={(newValue: any) => setTabValue(newValue)}
          tabsData={[
            { label: 'Nivel 1', value: 0 },
            { label: 'Nivel 2', value: 1 },
            { label: 'Nivel 3', value: 2 },
            { label: 'Nivel 4', value: 3 },
            { label: 'Nivel 5', value: 4 },
            { label: 'Nivel 6', value: 5 },
            { label: 'Nivel 7', value: 6 },
            { label: 'Nivel 8', value: 7 },
            { label: 'Nivel 9', value: 8 },
            { label: 'Nivel 10', value: 9 },
          ]}
          mostrarBotaoVoltar={false}
          mostrarNavbar={true}
        />
      ) : (
        <CustomizedTabs
          value={tabValue}
          onChange={(newValue: any) => setTabValue(newValue)}
          tabsData={[
            { label: 'Início', value: 0 },
            { label: 'Progresso', value: 1 },
            { label: 'Saque', value: 2 },
            { label: 'Faturas', value: 3 },
          ]}
          mostrarBotaoVoltar={false}
          mostrarNavbar={true}
        />
      )}
      {tabValue === 0 && <Nivel1 />}
      {tabValue === 1 && <Nivel2 />}
      {tabValue === 2 && <Nivel3 />}
      {tabValue === 3 && <Nivel4 />}
      {tabValue === 4 && <Nivel5 />}
      {tabValue === 5 && <Nivel6 />}
      {tabValue === 6 && <Nivel7 />}
      {tabValue === 7 && <Nivel8 />}
      {tabValue === 8 && <Nivel9 />}
      {tabValue === 9 && <Nivel10 />}
    </DefaultContainer>
  );
}
