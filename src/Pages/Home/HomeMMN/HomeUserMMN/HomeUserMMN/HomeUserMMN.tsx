import { useState } from 'react';
import { Inicio, Progresso, Saque } from '..';
import { CustomizedTabs, DefaultContainer } from '../../../../../components';
import { AdquiraSeusChips } from '../AdquiraSeusChips';

export function HomeUserMMN() {
  const [tabValue, setTabValue] = useState(0);
  console.log(tabValue);

  return (
    <DefaultContainer
      page={'Multinivel'}
      title={'Bem-vindo'}
      subTitle={'Ficamos felizes em te-lo de volta'}
      showSearch={false}
      showAvatar={true}
    >
      <CustomizedTabs
        value={tabValue}
        onChange={(newValue: any) => setTabValue(newValue)}
        tabsData={[
          { label: 'Inicio', value: 0 },
          { label: 'Progresso', value: 1 },
          { label: 'Saque', value: 2 },
          { label: 'Adquira Seus Chips', value: 3 },
        ]}
        mostrarBotaoVoltar={false}
        mostrarNavbar={true}
      />
      {tabValue === 0 && <Inicio />}
      {tabValue === 1 && <Progresso />}
      {tabValue === 2 && <Saque />}
      {tabValue === 3 && <AdquiraSeusChips />}
    </DefaultContainer>
  );
}
