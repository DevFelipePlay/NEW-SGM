import { apiPlayMMN } from '../../services/apiPlayMMN';
import { IReqPostPlayPctLicenciamento } from './IReqPostPlayPctLicenciamento';

export const postPlayValidaCpfLandingPage = async (req: IReqPostPlayPctLicenciamento) =>
  (await apiPlayMMN.post('/pctlicenciamento', req)).data;
