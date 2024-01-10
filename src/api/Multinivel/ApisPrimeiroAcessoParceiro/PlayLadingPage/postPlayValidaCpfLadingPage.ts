import { IReqPostPlayValidaCpfLadingpage } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayValidaCpfLandingPage = async (req: IReqPostPlayValidaCpfLadingpage) =>
  (await apiPlayMMN.post('/validacpf', req)).data;
