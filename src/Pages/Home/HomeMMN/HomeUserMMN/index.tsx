import { useState } from 'react';
import { CustomizedTabs, DefaultContainer } from '../../../../components';
import Tab0 from './Tab0';
import Tab1 from './Tab1';
import Tab2 from './Tab2';

export default function HomeUserMMN() {
  const [tabValue, setTabValue] = useState(0);
  console.log(tabValue);

  return (
    <DefaultContainer
      page={'Multinivel'}
      title={'Bem-vindo'}
      subTitle={'Ficamos felizes em te-lo de volta'}
      showSearch={true}
      showAvatar={true}
    >
      <CustomizedTabs
        value={tabValue}
        onChange={(newValue: any) => setTabValue(newValue)}
        tabsData={[
          { label: 'Inicio', value: 0 },
          { label: 'Progresso', value: 1 },
          { label: 'Saque', value: 2 },
          { label: 'Relatório', value: 3 },
        ]}
        mostrarBotaoVoltar={false}
        mostrarNavbar={true}
      />
      {tabValue === 0 && <Tab0 />}
      {tabValue === 1 && <Tab1 />}
      {tabValue === 2 && <Tab2 />}
    </DefaultContainer>
  );
}
