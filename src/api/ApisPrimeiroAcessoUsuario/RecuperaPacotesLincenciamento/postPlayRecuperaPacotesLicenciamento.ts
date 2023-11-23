import { IReqPostPlayRecuperaPacotesLicenciamento } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayRecuperaPacotesLicenciamento = async (
  req: IReqPostPlayRecuperaPacotesLicenciamento
) => (await apiPlayMMN.post('/recuperaPacotesLicenciamento', req)).data;
