import { IReqPostPlayCadastroNiveisRecarga } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayCadastroNiveisRecargaMMN = async (req: IReqPostPlayCadastroNiveisRecarga) =>
  (await apiPlayMMN.post('/CadastraNiveisRecarga', req)).data;
