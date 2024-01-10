import { IReqPostPlayQuantidadePontosUsuario } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayQuantidadePontosUsuario = async (req: IReqPostPlayQuantidadePontosUsuario) =>
  (await apiPlayMMN.post('/QuantidadePontosUsuario', req)).data;
