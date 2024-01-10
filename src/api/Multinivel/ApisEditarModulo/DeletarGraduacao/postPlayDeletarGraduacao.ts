import { IReqPostPlayDeletarGraduacao } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayDeletarGraduacao = async (req: IReqPostPlayDeletarGraduacao) =>
  (await apiPlayMMN.post('/DeletarGraduacao', req)).data;
