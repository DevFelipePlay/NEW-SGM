import { IReqPostPlayLimiteDeSaque } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayLimiteDeSaque = async (req: IReqPostPlayLimiteDeSaque) =>
  (await apiPlayMMN.post('/limiteDeSaque', req)).data;
