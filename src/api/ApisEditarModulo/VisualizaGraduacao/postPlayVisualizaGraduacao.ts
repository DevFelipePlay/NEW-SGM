import { apiPlayMMN } from '../../../services/apiPlayMMN';
import { IReqPostPlayVisualizaGraduacao } from './IReqPostPlayVisualizaGraduacao';

export const postPlayVisualizaGraduacao = async (req: IReqPostPlayVisualizaGraduacao) =>
  (await apiPlayMMN.post('/VisualizarGraduacao', req)).data;
