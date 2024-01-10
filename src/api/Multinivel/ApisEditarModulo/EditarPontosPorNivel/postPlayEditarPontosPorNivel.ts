import { IReqPostPlayEditarPontosPorNivel } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayEditarPontosPorNivel = async (req: IReqPostPlayEditarPontosPorNivel) =>
  (await apiPlayMMN.post('/EditarPontosPorNivel', req)).data;
