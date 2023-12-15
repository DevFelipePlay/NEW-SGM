import { useState } from 'react';
import { HistoricoPremios, ListaPostagem } from '.';
import { CustomizedTabs, DefaultContainer } from '../../../components';

export function SolicitacoesPremios() {
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

      {tabValue === 0 && <ListaPostagem />}
      {tabValue === 1 && <HistoricoPremios />}
    </DefaultContainer>
  );
}
