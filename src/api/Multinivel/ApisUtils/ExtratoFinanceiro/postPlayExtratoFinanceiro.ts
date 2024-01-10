import { IReqPostPlayExtratoFinanceiro } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayExtratoFinanceiro = async (req: IReqPostPlayExtratoFinanceiro) =>
  (await apiPlayMMN.post('/ExtratoFinanceiro', req)).data;
