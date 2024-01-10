import { apiPlayMMN } from '../../../services/apiPlayMMN';
import { IReqPostPlayDashboardUsuario } from './IReqPostPlayDashboardUsuario';

export const postPlayDashboardUsuario = async (req: IReqPostPlayDashboardUsuario) =>
  (await apiPlayMMN.post('/dashboardUsuario', req)).data;
