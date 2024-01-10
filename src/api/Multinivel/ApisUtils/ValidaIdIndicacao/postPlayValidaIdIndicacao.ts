import { IReqPostPlayValidaIdIndicacao } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayValidaIdIndicacao = async (req: IReqPostPlayValidaIdIndicacao) =>
  (await apiPlayMMN.post('/ValidaIdIndicacao', req)).data;
