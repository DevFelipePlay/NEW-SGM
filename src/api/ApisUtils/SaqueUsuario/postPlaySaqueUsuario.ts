import { IReqPostPlaySaqueUsuario } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlaySaqueUsuario = async (req: IReqPostPlaySaqueUsuario) =>
  (await apiPlayMMN.post('/SaqueUsuario', req)).data;
