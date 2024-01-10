import { IreqPostPlayVisualizaPremios } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayVisualizaPremios = async (req: IreqPostPlayVisualizaPremios) =>
  (await apiPlayMMN.post('/listaPremios', req)).data;
