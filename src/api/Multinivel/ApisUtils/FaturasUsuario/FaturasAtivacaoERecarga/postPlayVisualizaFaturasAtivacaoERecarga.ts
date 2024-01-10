import { IReqPostPlayVisualizaAtivacaoERecarga } from '.';
import { apiPlayMMN } from '../../../../../services/apiPlayMMN';

export const postPlayVisualizaFaturasAtivacaoERecarga = async (
  req: IReqPostPlayVisualizaAtivacaoERecarga
) => (await apiPlayMMN.post('/visualizaFaturas', req)).data;
