import { IReqPostPlayVisualizarPontosPorNivel } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayVisualizarPontosPorNivel = async (req: IReqPostPlayVisualizarPontosPorNivel) =>
  (await apiPlayMMN.post('/VisualizarPontosPorNivel', req)).data;
