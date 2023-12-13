import apiPlay from '../../../services/apiPlay';
import { IReqPostPlayGeraFaturaVendaChip } from './IReqPostPlayGeraFaturaVendaChip';

export const postPlayGeraFaturaVendaChip = async (req: IReqPostPlayGeraFaturaVendaChip) =>
  (await apiPlay.post('/geraFaturaVendaChip', req)).data;
