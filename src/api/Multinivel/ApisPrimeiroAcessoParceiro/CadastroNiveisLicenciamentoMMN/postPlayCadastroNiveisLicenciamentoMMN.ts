import { IReqPostPlayCadastroNiveisLicenciamentoMMN } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayCadastroNiveisLicenciamentoMMN = async (
  req: IReqPostPlayCadastroNiveisLicenciamentoMMN
) => (await apiPlayMMN.post('/CadastraNiveisLicenciamento', req)).data;
