import { apiPlayMMN } from '../../../services/apiPlayMMN';
import { IreqPostPlayVisualizaPremios } from './IReqPostPlayVisualizaPremios';

export const postPlayVisualizaPremios = async (req: IreqPostPlayVisualizaPremios) =>
  (await apiPlayMMN.post('/listaPremios', req)).data;
