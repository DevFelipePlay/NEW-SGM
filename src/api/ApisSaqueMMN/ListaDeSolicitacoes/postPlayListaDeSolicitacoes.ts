import { IReqPostPlayListaDeSolicitacoes } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayListaDeSolicitacoes = async (req: IReqPostPlayListaDeSolicitacoes) =>
  (await apiPlayMMN.post('/ListaSolicitacaoSaque', req)).data;
