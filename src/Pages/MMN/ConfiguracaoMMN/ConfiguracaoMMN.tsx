import { useState } from 'react';
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
          { label: 'Cadastro das Graduações', value: 2 },
          { label: 'Pontos por modalidade', value: 3 },
          { label: 'Taxas e saque', value: 4 },
          { label: 'Premios', value: 5 },
        ]}
        mostrarBotaoVoltar={false}
        mostrarNavbar={true}
      />
      {tabValue === 0 && 'teste3'}
      {tabValue === 1 && 'teste1'}
      {tabValue === 2 && 'teste1'}
      {tabValue === 3 && 'teste1'}
      {tabValue === 4 && 'teste1'}
      {tabValue === 5 && 'teste1'}
    </DefaultContainer>
  );
}
