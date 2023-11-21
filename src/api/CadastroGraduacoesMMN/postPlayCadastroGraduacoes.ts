import { apiPlayMMN } from '../../services/apiPlayMMN';
import { IReqPostPlayCadastroGraduacoesMMN } from './IReqPostPlayCadastroGraduacoes';

export const postPlayCadastroGraduacoesMMN = async (req: IReqPostPlayCadastroGraduacoesMMN) =>
  (await apiPlayMMN.post('/cadastragraduacao', req)).data;
