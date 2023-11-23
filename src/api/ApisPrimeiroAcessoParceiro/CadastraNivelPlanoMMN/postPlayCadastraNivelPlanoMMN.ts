import { IReqPostPlayCadastraNivelPlanosMMN } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayCadastraNivelPlanosMMN = async (req: IReqPostPlayCadastraNivelPlanosMMN) =>
  (await apiPlayMMN.post('/cadastrarNivelPlano', req)).data;
