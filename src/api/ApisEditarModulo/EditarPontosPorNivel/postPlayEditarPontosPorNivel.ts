import { apiPlayMMN } from '../../../services/apiPlayMMN';
import { IReqPostPlayEditarPontosPorNivel } from './IReqPostPlayEditarPontosPorNivel';

export const postPlayEditarPontosPorNivel = async (req: IReqPostPlayEditarPontosPorNivel) =>
  (await apiPlayMMN.post('/EditarPontosPorNivel', req)).data;
