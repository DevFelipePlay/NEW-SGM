import { IReqPostPlayListaSolicitacaoVendaChipUsuario } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlaySolicitacaosVendaChipUsuario = async (
  req: IReqPostPlayListaSolicitacaoVendaChipUsuario
) => (await apiPlayMMN.post('/ListaHistoricoVendaChipLicenciamento', req)).data;
