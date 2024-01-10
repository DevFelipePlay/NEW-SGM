import { IReqPostPlayFilaPremios } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayFilaPremios = async (req: IReqPostPlayFilaPremios) =>
  (await apiPlayMMN.post('/FilaListaPremios', req)).data;
