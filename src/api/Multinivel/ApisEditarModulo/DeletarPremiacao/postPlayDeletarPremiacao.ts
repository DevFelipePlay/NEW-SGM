import { IReqPostPlayDeletarPremiacao } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayDeletarPremiacao = async (req: IReqPostPlayDeletarPremiacao) =>
  (await apiPlayMMN.post('/DeletarPremiacao', req)).data;
