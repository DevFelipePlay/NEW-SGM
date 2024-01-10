import { IReqPostPlayEditaPremiacao } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayEditaPremios = async (req: IReqPostPlayEditaPremiacao[]) =>
  (await apiPlayMMN.post('/editaPremiacao', req)).data;
