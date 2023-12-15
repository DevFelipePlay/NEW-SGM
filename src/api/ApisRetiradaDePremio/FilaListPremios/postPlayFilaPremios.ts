import { apiPlayMMN } from '../../../services/apiPlayMMN';
import { IReqPostPlayFilaPremios } from './IReqPostPlayFilaPremios';

export const postPlayFilaPremios = async (req: IReqPostPlayFilaPremios) =>
  (await apiPlayMMN.post('/FilaListaPremios', req)).data;
