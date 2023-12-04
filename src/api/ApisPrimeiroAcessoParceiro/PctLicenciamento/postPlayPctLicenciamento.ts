import { IReqPostPlayPctLicenciamento } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayPctLicenciamento = async (reqArray: IReqPostPlayPctLicenciamento[]) =>
  (await apiPlayMMN.post('/CadastraPacotesLicenciamento', reqArray)).data;
