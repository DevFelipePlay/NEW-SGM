import { IReqPostPlayListaSolicitacaoSaquePremio } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayListaSolicitacaoSaquePremio = async (
  req: IReqPostPlayListaSolicitacaoSaquePremio
) => (await apiPlayMMN.post('/ListaSolicitacaoSaquePremio', req)).data;
