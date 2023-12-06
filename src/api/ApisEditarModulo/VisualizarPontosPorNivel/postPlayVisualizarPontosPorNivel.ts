import { apiPlayMMN } from '../../../services/apiPlayMMN';
import { IReqPostPlayVisualizarPontosPorNivel } from './IReqPostPlayVisualizarPontosPorNivel';

export const postPlayVisualizarPontosPorNivel = async (req: IReqPostPlayVisualizarPontosPorNivel) =>
  (await apiPlayMMN.post('/VisualizarPontosPorNivel', req)).data;
