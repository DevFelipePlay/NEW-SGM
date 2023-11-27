import { apiPlayMMN } from '../../../services/apiPlayMMN';
import { IReqPostPlayRecuperaIdIndicacao } from './IReqPostPlayRecuperaIdIndicacao';

export const postPlayRecuperaIdIndicacao = async (req: IReqPostPlayRecuperaIdIndicacao) =>
  (await apiPlayMMN.post('/checaiccid', req)).data;
