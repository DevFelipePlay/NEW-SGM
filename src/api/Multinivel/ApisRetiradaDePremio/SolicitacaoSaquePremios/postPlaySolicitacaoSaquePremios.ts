import { IReqPostPlaySolicitacaoSaquePremios } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlaySolicitacaoPremios = async (req: IReqPostPlaySolicitacaoSaquePremios) =>
  (await apiPlayMMN.post('/SolicitacaoSaquePremio', req)).data;
