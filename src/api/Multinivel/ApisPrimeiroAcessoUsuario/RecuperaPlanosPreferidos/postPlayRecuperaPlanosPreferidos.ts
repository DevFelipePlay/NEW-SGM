import { IReqPostPlayRecuperaPlanosPreferidos } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayRecuperaPlanosPreferidos = async (req: IReqPostPlayRecuperaPlanosPreferidos) =>
  (await apiPlayMMN.post('/recuperaPlanosPreferidos', req)).data;
