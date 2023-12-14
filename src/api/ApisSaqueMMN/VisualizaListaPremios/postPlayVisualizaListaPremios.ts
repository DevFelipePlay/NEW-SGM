import { apiPlayMMN } from '../../../services/apiPlayMMN';
import { IReqPostPlayVisualizaListaPremios } from './IReqPostPlayVisualizaListaPremios';

export const postPlayVisualizaListaPremios = async (req: IReqPostPlayVisualizaListaPremios) =>
  (await apiPlayMMN.post('/listaPremios', req)).data;
