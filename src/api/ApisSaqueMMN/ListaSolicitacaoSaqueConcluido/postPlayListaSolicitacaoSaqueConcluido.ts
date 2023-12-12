import { IReqPostPlayListaSolicitacaoSaqueConcluido } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayListaSolicitacaoSaqueConcluido = async (
  req: IReqPostPlayListaSolicitacaoSaqueConcluido
) => (await apiPlayMMN.post('/ListaSolicitacaoSaqueConcluido', req)).data;
