import { IReqPostPlayEditarNiveisRecarga } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayEditarNiveisRecarga = async (req: IReqPostPlayEditarNiveisRecarga) =>
  (await apiPlayMMN.post('/EditarNiveisRecarga', req)).data;
