import { IReqPostPlayVisualizaNiveisLicenciamento } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayVisualizaNiveisLicenciamento = async (
  req: IReqPostPlayVisualizaNiveisLicenciamento
) => (await apiPlayMMN.post('/VisualizarNiveisLicenciamento', req)).data;
