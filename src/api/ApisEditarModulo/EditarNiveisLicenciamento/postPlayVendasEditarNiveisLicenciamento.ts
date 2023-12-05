import { IReqPostPlayEditarNiveisLicenciamento } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayEditarNiveisLicenciamento = async (
  req: IReqPostPlayEditarNiveisLicenciamento
) => (await apiPlayMMN.post('/EditarNiveisLicenciamento', req)).data;
