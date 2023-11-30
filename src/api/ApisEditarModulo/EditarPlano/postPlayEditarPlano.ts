import { apiPlayMMN } from '../../../services/apiPlayMMN';
import { IReqPostPlayEditarPlano } from './IReqPostPlayEditarPlano';

export const postPlayEditarPlano = async (req: IReqPostPlayEditarPlano[]) =>
  (await apiPlayMMN.post('/EditarNivelPlano', req)).data;
