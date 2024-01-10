import { IReqPostPlayDeletarPacotesLicenciamento } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayDeletarPacotesLicenciamento = async (
  req: IReqPostPlayDeletarPacotesLicenciamento
) => (await apiPlayMMN.post('/DeletarPacoteLicenciamento', req)).data;
