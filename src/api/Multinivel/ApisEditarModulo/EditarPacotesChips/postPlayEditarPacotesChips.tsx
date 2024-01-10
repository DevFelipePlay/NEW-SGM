import { IReqPostPlayEditarPacotesChips } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayEditarPacotesChips = async (req: IReqPostPlayEditarPacotesChips) =>
  (await apiPlayMMN.post('/EditaPacoteVendaChip', req)).data;
