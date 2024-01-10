import { IReqPostPlayValidaICCID } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayValidaICCID = async (req: IReqPostPlayValidaICCID) =>
  (await apiPlayMMN.post('/checaiccid', req)).data;
