import { IReqPostPlayVisualizaGraduacao } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayVisualizaGraduacao = async (req: IReqPostPlayVisualizaGraduacao) =>
  (await apiPlayMMN.post('/VisualizarGraduacao', req)).data;
