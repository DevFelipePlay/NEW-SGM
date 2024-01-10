import { IReqPostPlayRecuperaNiveisParceiro } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayRecuperaNiveisParceiro = async (req: IReqPostPlayRecuperaNiveisParceiro) =>
  (await apiPlayMMN.post('/recuperaNiveisParceiro', req)).data;
