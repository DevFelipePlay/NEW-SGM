export interface IResPostPlayRecuperaNiveisParceiro {
  nivel: number;
  usuarios: IUsuarios;
}

interface IUsuarios {
  id: number;
  userid: number;
  super: boolean;
  cpf: string;
  id_indicacao: string;
  id_patrocinador: string;
  pontos_premios: string;
  pontos_graduacao: string;
  graduacao: string | null;
  tipo_pix: string;
  chave_pix: string;
  nome_titular_pix: string;
  cpf_titular_pix: string;
  etapa_cad_user: 0;
  created_at: string;
}
