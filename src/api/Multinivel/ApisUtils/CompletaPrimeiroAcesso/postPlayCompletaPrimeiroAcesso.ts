import { IReqPostPlayCompletaPrimeiroAcesso } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayCompletaPrimeiroAcesso = async (req: IReqPostPlayCompletaPrimeiroAcesso) =>
  (await apiPlayMMN.post('/CompletaPrimeiroAcesso', req)).data;
