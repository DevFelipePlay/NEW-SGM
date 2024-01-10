import { IReqPostPlayGeraFaturaVendaChip } from '.';
import apiPlay from '../../../../services/apiPlay';

export const postPlayGeraFaturaVendaChip = async (req: IReqPostPlayGeraFaturaVendaChip) =>
  (await apiPlay.post('/geraFaturaVendaChip', req)).data;
