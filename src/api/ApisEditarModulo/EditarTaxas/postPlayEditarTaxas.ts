import { IReqPostPlayEditarTaxas } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayEditarTaxas = async (req: IReqPostPlayEditarTaxas) =>
  (await apiPlayMMN.post('/EditarTaxas', req)).data;
