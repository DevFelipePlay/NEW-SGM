import { IReqPostPlayEditarGraduacao } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayEditarGraduacao = async (req: IReqPostPlayEditarGraduacao) =>
  (await apiPlayMMN.post('/EditarGraduacao', req)).data;
