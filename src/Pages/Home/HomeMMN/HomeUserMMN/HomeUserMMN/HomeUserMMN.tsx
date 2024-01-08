import { useState } from 'react';
import { Faturas, Inicio, LicenciadosUsuario, Progresso, Saque } from '..';
import { CustomizedTabs, DefaultContainer } from '../../../../../components';
import useUser from '../../../../../hooks/useUser';
import { AdquiraSeusChips } from '../AdquiraSeusChips';
import ExtratoFinanceiro from '../ExtratoFinanceiro/ExtratoFinanceiro';

export function HomeUserMMN() {
  const [tabValue, setTabValue] = useState(0);
  const { user } = useUser();
  console.log(tabValue);

  return (
    <DefaultContainer
      page={'Multinível'}
      title={'Bem-vindo'}
      subTitle={'Ficamos felizes em tê-lo de volta'}
      showSearch={false}
      showAvatar={true}
    >
      {user?.licenciado ? (
        <CustomizedTabs
          value={tabValue}
          onChange={(newValue: any) => setTabValue(newValue)}
          tabsData={[
            { label: 'Início', value: 0 },
            { label: 'Progresso', value: 1 },
            { label: 'Saque', value: 2 },
            { label: 'Faturas', value: 3 },
            { label: 'Adquira Seus Chips', value: 4 },
            { label: 'Extrato Financeiro', value: 5 },
            { label: 'Licenciados', value: 6 },
          ]}
          mostrarBotaoVoltar={false}
          mostrarNavbar={true}
        />
      ) : (
        <CustomizedTabs
          value={tabValue}
          onChange={(newValue: any) => setTabValue(newValue)}
          tabsData={[
            { label: 'Início', value: 0 },
            { label: 'Progresso', value: 1 },
            { label: 'Saque', value: 2 },
            { label: 'Faturas', value: 3 },
            { label: 'Extrato Financeiro', value: 4 },
            { label: 'Licenciados', value: 5 },
          ]}
          mostrarBotaoVoltar={false}
          mostrarNavbar={true}
        />
      )}
      {tabValue === 0 && <Inicio />}
      {tabValue === 1 && <Progresso />}
      {tabValue === 2 && <Saque />}
      {tabValue === 3 && <Faturas />}

      {tabValue === 4 && <AdquiraSeusChips />}
      {tabValue === 5 && <ExtratoFinanceiro />}
      {tabValue === 6 && <LicenciadosUsuario />}
    </DefaultContainer>
  );
}
