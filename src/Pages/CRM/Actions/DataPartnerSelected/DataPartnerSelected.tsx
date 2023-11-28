import { useState } from 'react';

import { BotaoAcoes, CustomizedTabs, DefaultContainer } from '../../../../components';
import Activities from '../Activities/Activities';
import EditarApp from '../EditApp/EditarApp';
import EditarDados from '../EditData/EditarDados';
import Financeiro from '../Financial/Financeiro';
import Planos from '../Plans/Plans';
import PosPago from '../PosPago/PosPago';
import Usuarios from '../Usuarios/Usuarios';

export default function DataPartnerSelected() {
  const [tabValue, setTabValue] = useState(0);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  return (
    <>
      <DefaultContainer
        page={'CRM'}
        title={title}
        subTitle={subtitle}
        showSearch={false}
        showAvatar={true}
      >
        <CustomizedTabs
          value={tabValue}
          onChange={(newValue) => {
            setTabValue(newValue);
          }}
          tabsData={[
            { label: 'Editar Dados', value: 0 },
            { label: 'Editar App', value: 1 },
            { label: 'Usuários', value: 2 },
            { label: 'Planos', value: 3 },
            { label: 'Pós-Pago', value: 4 },
            { label: 'Atividades', value: 5 },
            { label: 'Financeiro', value: 6 },
          ]}
          mostrarBotaoVoltar={true}
          mostrarNavbar={true}
        />
        {tabValue === 0 && <EditarDados setTitle={setTitle} setSubtitle={setSubtitle} />}
        {tabValue === 1 && <EditarApp setTitle={setTitle} setSubtitle={setSubtitle} />}
        {tabValue === 2 && <Usuarios setTitle={setTitle} setSubtitle={setSubtitle} />}
        {tabValue === 3 && <Planos setTitle={setTitle} setSubtitle={setSubtitle} />}
        {tabValue === 4 && <PosPago setTitle={setTitle} setSubtitle={setSubtitle} />}
        {tabValue === 5 && <Activities setTitle={setTitle} setSubtitle={setSubtitle} />}
        {tabValue === 6 && <Financeiro setTitle={setTitle} setSubtitle={setSubtitle} />}
      </DefaultContainer>
      <BotaoAcoes />
    </>
  );
}
