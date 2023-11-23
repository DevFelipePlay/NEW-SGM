import { IReqPostPlayCadastroGraduacoesMMN } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayCadastroGraduacoesMMN = async (req: IReqPostPlayCadastroGraduacoesMMN) =>
  (await apiPlayMMN.post('/cadastragraduacao', req)).data;
