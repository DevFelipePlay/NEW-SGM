import { IReqPostPlayListaSolicitacaoVendaChip } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlaySolicitacaoVendaChip = async (req: IReqPostPlayListaSolicitacaoVendaChip) =>
  (await apiPlayMMN.post('/ListaSolicitacaoVendaChipLicenciamento', req)).data;
