import { IReqPostPLayVisualizaFaturas } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPLayVisualizaFaturas = async (req: IReqPostPLayVisualizaFaturas) =>
  (await apiPlayMMN.post('/visualizarTodasFaturas', req)).data;
