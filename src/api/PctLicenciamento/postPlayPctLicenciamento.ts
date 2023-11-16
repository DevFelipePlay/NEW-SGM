import { apiPlayMMN } from '../../services/apiPlayMMN';
import { IReqPostPlayPctLicenciamento } from './IReqPostPlayPctLicenciamento';

export const postPlayPctLicenciamento = async (reqArray: IReqPostPlayPctLicenciamento[]) =>
  (await apiPlayMMN.post('/pctlicenciamento', reqArray)).data;
