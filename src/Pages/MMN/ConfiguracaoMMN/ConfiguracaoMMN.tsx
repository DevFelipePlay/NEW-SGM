import { useState } from 'react';
import {
  EditarGraduações,
  EditarPacotes,
  EditarPlanos,
  EditarPontos,
  EditarPremios,
  EditarTaxasESaque,
  NiveisDeDistribuicao,
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
          { label: 'Licenciamento', value: 0 },
          { label: 'Pacotes', value: 1 },
          { label: 'Planos', value: 2 },
          { label: 'Graduações', value: 3 },
          { label: 'Pontos', value: 4 },
          { label: 'Taxas e saque', value: 5 },
          { label: 'Premios', value: 6 },
          { label: 'Niveis de distribuição', value: 7 },
        ]}
        mostrarBotaoVoltar={false}
        mostrarNavbar={true}
      />
      {tabValue === 0 && <EditarPacotes />}
      {tabValue === 1 && <>teste</>}
      {tabValue === 2 && <EditarPlanos />}
      {tabValue === 3 && <EditarGraduações />}
      {tabValue === 4 && <EditarPontos />}
      {tabValue === 5 && <EditarTaxasESaque />}
      {tabValue === 6 && <EditarPremios />}
      {tabValue === 7 && <NiveisDeDistribuicao />}
    </DefaultContainer>
  );
}
