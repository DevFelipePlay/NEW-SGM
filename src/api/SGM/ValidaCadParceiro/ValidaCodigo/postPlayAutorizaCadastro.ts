import { IReqPostPlayAutorizaCadastro } from '.';
import apiPlaySgm from '../../../../services/apiPlaySgm';

export const postPlayAutorizaCadastro = async (req: IReqPostPlayAutorizaCadastro) =>
  (await apiPlaySgm.post('/autorizaCadastro', req)).data;
