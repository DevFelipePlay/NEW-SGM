import { IReqPostPlayEditaImagemPremio } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayEditarImagemPremio = async (req: IReqPostPlayEditaImagemPremio) =>
  (await apiPlayMMN.post('/editaImagemPremio', req)).data;
