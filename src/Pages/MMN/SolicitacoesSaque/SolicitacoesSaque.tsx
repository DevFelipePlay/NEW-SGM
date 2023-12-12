import { useState } from 'react';
import { Historico } from '.';
import { CustomizedTabs, DefaultContainer } from '../../../components';
import { ListaAprovaocao } from './ListaAprovacao';

export function SolicitacoesSaque() {
  const [tabValue, setTabValue] = useState(0);
  return (
    <DefaultContainer
      page={'Aprovar Saque'}
      title={'Solicitações de Saque'}
      subTitle={'Aprovar solicitações de saque'}
      showSearch={false}
      showAvatar={true}
    >
      <CustomizedTabs
        value={tabValue}
        onChange={(newValue: any) => setTabValue(newValue)}
        tabsData={[
          { label: 'Lista para aprovação', value: 0 },
          { label: 'Histórico', value: 1 },
        ]}
        mostrarBotaoVoltar={false}
        mostrarNavbar={true}
      />

      {tabValue === 0 && <ListaAprovaocao />}
      {tabValue === 1 && <Historico />}
    </DefaultContainer>
  );
}
