import { useState } from 'react';
import { HistoricoPacotesParceiro, ListaPostagemPacotes } from '../..';
import { CustomizedTabs, DefaultContainer } from '../../../../components';

export function SolicitacoesPacotes() {
  const [tabValue, setTabValue] = useState(0);
  return (
    <DefaultContainer
      page={'Aprovar Solicitações de Envio de Pacotes'}
      title={'Solicitações de Envio de Pacotes'}
      subTitle={'Solicitações'}
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

      {tabValue === 0 && <ListaPostagemPacotes />}
      {tabValue === 1 && <HistoricoPacotesParceiro />}
    </DefaultContainer>
  );
}
