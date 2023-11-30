import { apiPlayMMN } from '../../../services/apiPlayMMN';
import { IReqPostPlayDeletarPremiacao } from './IReqPostPlayDeletarPremiacao';

export const postPlayDeletarPremiacao = async (req: IReqPostPlayDeletarPremiacao) =>
  (await apiPlayMMN.post('/DeletarPremiacao', req)).data;
