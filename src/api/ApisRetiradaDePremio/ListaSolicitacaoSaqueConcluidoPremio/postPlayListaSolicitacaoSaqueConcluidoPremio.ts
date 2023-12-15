import { IReqPostPlayListaSolicitacaoSaqueConcluidoPremio } from '../..';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayListaSolicitacaoSaqueConcluidoPremio = async (
  req: IReqPostPlayListaSolicitacaoSaqueConcluidoPremio
) => (await apiPlayMMN.post('/ListaSolicitacaoSaqueConcluidoPremio', req)).data;
