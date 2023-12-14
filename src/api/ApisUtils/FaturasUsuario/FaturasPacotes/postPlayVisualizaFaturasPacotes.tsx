import { IReqPostPlayVisualizaFaturasPacotes } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPLayVisualizaFaturasPacotes = async (req: IReqPostPlayVisualizaFaturasPacotes) =>
  (await apiPlayMMN.post('/visualizaFaturasPacotes', req)).data;
