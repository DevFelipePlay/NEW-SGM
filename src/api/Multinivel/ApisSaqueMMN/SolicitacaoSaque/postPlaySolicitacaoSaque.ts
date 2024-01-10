import { IReqPostPlaySolicitacaoSaque } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlaySolicitacaoSaque = async (req: IReqPostPlaySolicitacaoSaque) =>
  (await apiPlayMMN.post('/SolicitacaoSaque', req)).data;
