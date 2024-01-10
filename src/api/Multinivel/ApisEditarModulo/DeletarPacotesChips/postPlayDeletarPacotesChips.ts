import { apiPlayMMN } from '../../../../services/apiPlayMMN';
import { IReqPostPlayDeletarPacotesChips } from './IReqPostPlayDeletarPacotesChips';

export const postPlayDeletarPacotesChips = async (req: IReqPostPlayDeletarPacotesChips) =>
  (await apiPlayMMN.post('/DeletarPacoteVendaChip', req)).data;
