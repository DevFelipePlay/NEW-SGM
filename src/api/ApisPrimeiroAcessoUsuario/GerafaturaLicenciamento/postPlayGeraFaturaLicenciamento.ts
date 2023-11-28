import { apiPlayMMN } from '../../../services/apiPlayMMN';
import { IReqPostPlayGeraFaturaLicenciamento } from './IReqPostPlayGeraFaturaLicenciamento';

export const postPlayGeraFaturaLicenciamento = async (req: IReqPostPlayGeraFaturaLicenciamento) =>
  (await apiPlayMMN.post('/geraFaturaLicenciamento', req)).data;
