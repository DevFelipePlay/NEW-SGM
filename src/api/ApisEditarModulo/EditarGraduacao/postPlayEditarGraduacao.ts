import { apiPlayMMN } from '../../../services/apiPlayMMN';
import { IReqPostPlayEditarGraduacao } from './IReqPostPlayEditarGraduacao';

export const postPlayEditarGraduacao = async (req: IReqPostPlayEditarGraduacao) =>
  (await apiPlayMMN.post('/EditarGraduacao', req)).data;
