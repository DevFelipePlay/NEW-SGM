import { useState } from 'react';
import {
  EditarGraduações,
  EditarPacotes,
  EditarPlanos,
  EditarPontos,
  EditarPremios,
  EditarTaxasESaque,
} from '.';
import { CustomizedTabs, DefaultContainer } from '../../../components';

export function ConfiguracaoMMN() {
  const [tabValue, setTabValue] = useState(0);
  return (
    <DefaultContainer
      page={'Configarações Gerais'}
      title={'Configurações '}
      subTitle={'Configure todo os dados usados no seu multinivel'}
      showSearch={false}
      showAvatar={true}
    >
      <CustomizedTabs
        value={tabValue}
        onChange={(newValue) => setTabValue(newValue)}
        tabsData={[
          { label: 'Pacotes', value: 0 },
          { label: 'Planos', value: 1 },
          { label: 'Graduações', value: 2 },
          { label: 'Pontos', value: 3 },
          { label: 'Taxas e saque', value: 4 },
          { label: 'Premios', value: 5 },
        ]}
        mostrarBotaoVoltar={false}
        mostrarNavbar={true}
      />
      {tabValue === 0 && <EditarPacotes />}
      {tabValue === 1 && <EditarPlanos />}
      {tabValue === 2 && <EditarGraduações />}
      {tabValue === 3 && <EditarPontos />}
      {tabValue === 4 && <EditarTaxasESaque />}
      {tabValue === 5 && <EditarPremios />}
    </DefaultContainer>
  );
}
