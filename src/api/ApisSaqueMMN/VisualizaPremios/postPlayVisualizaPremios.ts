import { apiPlayMMN } from '../../../services/apiPlayMMN';
import { IReqPostPlayVisualizaPremios } from './IReqPostPlayVisualizaPremios';

export const postPlayVisualizaListaPremios = async (req: IReqPostPlayVisualizaPremios) =>
  (await apiPlayMMN.post('/listaPremios', req)).data;
