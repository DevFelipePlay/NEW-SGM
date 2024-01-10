import { IReqPostPlayListaSolicitacaoVendaChipConcluido } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayListaSolicitacaoVendaChipConcluido = async (
  req: IReqPostPlayListaSolicitacaoVendaChipConcluido
) => (await apiPlayMMN.post('/ListaSolicitacaoSaqueConcluidoVendaChipLicenciamento', req)).data;
