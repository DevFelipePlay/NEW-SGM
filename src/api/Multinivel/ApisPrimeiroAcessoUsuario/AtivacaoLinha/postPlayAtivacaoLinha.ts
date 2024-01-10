import { IReqPostPlayAtivacaoLinha } from '.';
import apiPlay from '../../../../services/apiPlay';

export const postPlayAtivacaoLinha = async (req: IReqPostPlayAtivacaoLinha) =>
  (await apiPlay.post('ativacao/ativar', req)).data;
