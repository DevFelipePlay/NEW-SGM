import { useState } from 'react';
import { CustomizedTabs, DefaultContainer } from '../../../../components';
import Tab0 from './Inicio';
import RedeDeUsuariosParceiroMMN from './Rede/RedeDeUsuariosParceiroMMN';

export default function HomeAdminMMN() {
  const [tabValue, setTabValue] = useState(0);
  console.log(tabValue);

  return (
    <DefaultContainer
      page={'Multinível'}
      title={'Bem-vindo'}
      subTitle={'Ficamos felizes em te-lô de volta'}
      showSearch={false}
      showAvatar={true}
    >
      <CustomizedTabs
        value={tabValue}
        onChange={(newValue) => setTabValue(newValue)}
        tabsData={[
          { label: 'Início', value: 0 },
          { label: 'Patrocinados', value: 2 },
        ]}
        mostrarBotaoVoltar={false}
        mostrarNavbar={true}
      />

      {tabValue === 0 && <Tab0 />}
      {tabValue === 1 && <RedeDeUsuariosParceiroMMN />}
    </DefaultContainer>
  );
}
