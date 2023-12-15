import { IReqPostPLayConfirmacaoSolicitacaoSaquePremio } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPLayConfirmacaoSolicitacaoSaquePremio = async (
  req: IReqPostPLayConfirmacaoSolicitacaoSaquePremio
) => (await apiPlayMMN.post('/ConfirmacaoSolicitacaoSaquePremio', req)).data;
