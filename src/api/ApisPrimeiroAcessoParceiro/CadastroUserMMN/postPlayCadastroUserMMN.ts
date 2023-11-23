import { IReqPostPlayCadastroUserMMN } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayCadastroUserMMN = async (req: IReqPostPlayCadastroUserMMN) =>
  (await apiPlayMMN.post('/cad', req)).data;
