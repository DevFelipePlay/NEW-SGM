import { IReqPostPlayDashboardUsuarioContinue } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayDashboardUsuarioContinue = async (req: IReqPostPlayDashboardUsuarioContinue) =>
  (await apiPlayMMN.post('/dashboardUsuarioContinue', req)).data;
