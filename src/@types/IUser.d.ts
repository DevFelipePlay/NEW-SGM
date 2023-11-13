export interface IUser {
  parceiro: string;
  cnpj: string;
  cpf: string;
  name: string;
  email: string | null;
  userid: number;
  companyid: number | blob;
  profileid: EnumProfileId;
  token: string | Blob;
  logotipo: string | null;
  status: number;
  faturaaberta: number;
  faturas: readonly any[] | undefined;
  pospago: boolean;
  mk: boolean;
  cadastrocompleto: boolean;
  pages: any;
  parceirorevendedor: boolean;
  primeiroAcesso: boolean;
}

/**
 * `-1 - Ultra`
 * `0 - Super`
 * `1 - Admin`
 * `2 - Atendente`
 * `3 - Cliente`
 * `4 - Vendedor`
 * `5 - Desativado`
 * `6 - Franquia`
 */
export type EnumProfileId = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**`-1 - Ultra` */
const Ultra: EnumProfileId = -1;
