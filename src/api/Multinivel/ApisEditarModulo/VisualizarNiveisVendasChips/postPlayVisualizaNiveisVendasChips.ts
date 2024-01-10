import { IReqPostPlayVisualizaNiveisVendasChips } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayVisualizaNiveisVendasChips = async (
  req: IReqPostPlayVisualizaNiveisVendasChips
) => (await apiPlayMMN.post('/VisualizarNiveisVendasChips', req)).data;
