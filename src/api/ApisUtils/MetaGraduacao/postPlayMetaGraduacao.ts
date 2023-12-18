import { IReqPostPlayMetaGraduacao } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayMetaGraduacao = async (req: IReqPostPlayMetaGraduacao) =>
  (await apiPlayMMN.post('/MetaGraduacao', req)).data;
