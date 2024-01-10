import { IReqPostPlayVisualizaListaPremios } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayVisualizaListaPremios = async (req: IReqPostPlayVisualizaListaPremios) =>
  (await apiPlayMMN.post('/listaPremios', req)).data;
