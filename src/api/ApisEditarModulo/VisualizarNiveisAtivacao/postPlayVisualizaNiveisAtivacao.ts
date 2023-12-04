import { IReqPostPlayVisualizaNiveisAtivacao } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayVisualizaNiveisAtivacao = async (req: IReqPostPlayVisualizaNiveisAtivacao) =>
  (await apiPlayMMN.post('/VisualizarNiveisAtivacao', req)).data;
