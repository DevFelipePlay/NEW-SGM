import { IReqPostPlayVisualizaTaxas } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayVisualizaTaxas = async (req: IReqPostPlayVisualizaTaxas) =>
  (await apiPlayMMN.post('/VisualizarTaxas', req)).data;
