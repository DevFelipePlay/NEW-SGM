import { IReqPostPlayConfirmacaoSolicitacaoVendaChipLicenciamento } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayConfirmacaoSolicitacaoVendaChipLicenciamento = async (
  req: IReqPostPlayConfirmacaoSolicitacaoVendaChipLicenciamento
) => (await apiPlayMMN.post('/ConfirmacaoSolicitacaoVendaChipLicenciamento', req)).data;
