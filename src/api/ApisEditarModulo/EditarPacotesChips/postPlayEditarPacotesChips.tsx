import { apiPlayMMN } from '../../../services/apiPlayMMN';
import { IReqPostPlayEditarPacotesChips } from './IReqPostPlayEditarPacotesChips';

export const postPlayEditarPacotesChips = async (req: IReqPostPlayEditarPacotesChips) =>
  (await apiPlayMMN.post('/EditaPacoteVendaChip', req)).data;
