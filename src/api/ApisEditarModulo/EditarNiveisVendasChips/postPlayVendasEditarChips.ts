import { IReqPostPlayEditarNiveisVendasChips } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayEditarNiveisVendasChips = async (req: IReqPostPlayEditarNiveisVendasChips) =>
  (await apiPlayMMN.post('/EditarNiveisVendasChips', req)).data;
