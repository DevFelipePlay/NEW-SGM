import { apiPlayMMN } from '../../../services/apiPlayMMN';
import { IReqPostPlayCadastroNiveisLicenciamentoMMN } from './IReqPostPlayCadastroNiveisLicenciamentoMMN';

export const postPlayCadastroNiveisLicenciamentoMMN = async (
  req: IReqPostPlayCadastroNiveisLicenciamentoMMN
) => (await apiPlayMMN.post('/CadastraNiveisLicenciamento', req)).data;
