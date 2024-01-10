import { IReqPostPlayVisualizaNiveisRecarga } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayVisualizaNiveisRecarga = async (req: IReqPostPlayVisualizaNiveisRecarga) =>
  (await apiPlayMMN.post('/VisualizarNiveisRecarga', req)).data;
