import { useState } from 'react';

import { HistoricoPremios, HistoricoSaque } from '..';
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
          { label: 'Solicitação de Retirada Prêmios', value: 1 },
        ]}
        mostrarBotaoVoltar={false}
        mostrarNavbar={true}
      />
      {tabValue === 0 && <HistoricoSaque />}
      {tabValue === 1 && <HistoricoPremios />}
    </DefaultContainer>
  );
}
