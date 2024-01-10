import { IReqPostPlayRecuperaIdIndicacao } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayRecuperaIdIndicacao = async (req: IReqPostPlayRecuperaIdIndicacao) =>
  (await apiPlayMMN.post('/checaiccid', req)).data;
