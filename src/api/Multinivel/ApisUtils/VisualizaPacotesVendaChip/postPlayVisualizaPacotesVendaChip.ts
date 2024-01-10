import { IReqPostPlayVisualizaPacotesVendaChip } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayVisualizaPacotesVendaChip = async (
  req: IReqPostPlayVisualizaPacotesVendaChip
) => (await apiPlayMMN.post('/VisualizarPacotesVendaChip', req)).data;
