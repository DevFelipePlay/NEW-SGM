import { IReqPostPlayCadastroNiveisVendasChips } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayCadastroNiveisVendasChipsMMN = async (
  req: IReqPostPlayCadastroNiveisVendasChips
) => (await apiPlayMMN.post('/CadastraNiveisVendasChips', req)).data;
