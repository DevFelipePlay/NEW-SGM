import { IReqPostPlayCadastroNiveisMMN } from '.';
import { apiPlayMMN } from '../../services/apiPlayMMN';

export const postPlayCadastroNiveisMMN = async (req: IReqPostPlayCadastroNiveisMMN) =>
  (await apiPlayMMN.post('/cadastraniveis', req)).data;
