import { useState } from 'react';

import { HistoricoPacotesUsuario, HistoricoPremiosUsuario, HistoricoSaque } from '..';
import { CustomizedTabs, DefaultContainer } from '../../../../components';

export function HistoricoDeSolicitacoesUsuario() {
  const [tabValue, setTabValue] = useState(0);

  return (
    <DefaultContainer
      page={'Multinivel'}
      title={'Historico de Solicitações'}
      subTitle={'Historico de prêmios e saque'}
      showSearch={false}
      showAvatar={true}
    >
      <CustomizedTabs
        value={tabValue}
        onChange={(newValue: any) => setTabValue(newValue)}
        tabsData={[
          { label: 'Solicitações de Saques', value: 0 },
          { label: 'Solicitações de Retirada Prêmios', value: 1 },
          { label: 'Solicitações de Compra de Pacotes', value: 2 },
        ]}
        mostrarBotaoVoltar={false}
        mostrarNavbar={true}
      />
      {tabValue === 0 && <HistoricoSaque />}
      {tabValue === 1 && <HistoricoPremiosUsuario />}
      {tabValue === 2 && <HistoricoPacotesUsuario />}
    </DefaultContainer>
  );
}
