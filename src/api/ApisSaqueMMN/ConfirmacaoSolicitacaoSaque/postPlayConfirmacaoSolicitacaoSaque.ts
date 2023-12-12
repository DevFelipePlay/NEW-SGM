import { IReqPostPlayConfirmacaoSolicitacaoSaque } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayConfirmacaoSolicitacaoSaque = async (
  req: IReqPostPlayConfirmacaoSolicitacaoSaque
) => (await apiPlayMMN.post('/ConfirmacaoSolicitacaoSaque', req)).data;
