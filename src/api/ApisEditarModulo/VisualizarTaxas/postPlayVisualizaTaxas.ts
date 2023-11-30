import { apiPlayMMN } from '../../../services/apiPlayMMN';
import { IReqPostPlayVisualizaTaxas } from './IReqPostPlayVisualizaTaxas';

export const postPlayVisualizaTaxas = async (req: IReqPostPlayVisualizaTaxas) =>
  (await apiPlayMMN.post('/VisualizarTaxas', req)).data;
