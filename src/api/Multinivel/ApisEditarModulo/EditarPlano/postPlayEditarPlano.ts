import { IReqPostPlayEditarPlano } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayEditarPlano = async (req: IReqPostPlayEditarPlano[]) =>
  (await apiPlayMMN.post('/EditarNivelPlano', req)).data;
