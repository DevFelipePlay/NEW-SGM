import { IReqPostPlayEditarPacotesLicenciamento } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayEditarPacotesLicenciamento = async (
  req: IReqPostPlayEditarPacotesLicenciamento
) => (await apiPlayMMN.post('/EditaPacoteLicenciamento', req)).data;
