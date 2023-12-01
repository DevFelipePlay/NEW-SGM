import { IReqPostPlayCadastroNiveisAtivacaoMMN } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayCadastroNiveisAtivacaoMMN = async (
  req: IReqPostPlayCadastroNiveisAtivacaoMMN
) => (await apiPlayMMN.post('/CadastraNiveisAtivacao', req)).data;
