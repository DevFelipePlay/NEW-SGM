import { Card } from '@mui/material';
import { DefaultContainer } from '../../../components';

export function ConfiguracaoMMN() {
  return (
    <DefaultContainer
      page={'Configarações Gerais'}
      title={'Configurações do seu MMN'}
      subTitle={'Configure toda a logistica para o seu multinivel'}
      showSearch={false}
      showAvatar={true}
    >
      <Card></Card>
    </DefaultContainer>
  );
}
