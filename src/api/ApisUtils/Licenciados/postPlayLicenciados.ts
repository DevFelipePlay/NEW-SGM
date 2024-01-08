import { IReqPostPlayLicenciados } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayLicenciados = async (req: IReqPostPlayLicenciados) =>
  (await apiPlayMMN.post('/Licenciados', req)).data;
