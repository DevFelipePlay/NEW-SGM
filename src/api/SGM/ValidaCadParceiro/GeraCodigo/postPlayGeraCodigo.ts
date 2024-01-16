import { IReqPostPlayGeraCodigo } from '.';
import apiPlaySgm from '../../../../services/apiPlaySgm';

export const postPlayGeraCodigo = async (req: IReqPostPlayGeraCodigo) =>
  (await apiPlaySgm.post('/geraCodigo', req)).data;
