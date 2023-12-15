import { IReqPostPlayAcumularPremio } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayAcumularPremios = async (req: IReqPostPlayAcumularPremio) =>
  (await apiPlayMMN.post('/AcumularPremio', req)).data;
