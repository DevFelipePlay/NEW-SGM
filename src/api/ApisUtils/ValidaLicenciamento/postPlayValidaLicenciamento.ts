import { IReqPostPlayValidaLicenciamento } from '..';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayValidaLicenciamento = async (req: IReqPostPlayValidaLicenciamento) =>
  (await apiPlayMMN.post('/validaLicenciamento', req)).data;
