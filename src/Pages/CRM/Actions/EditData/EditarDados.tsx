interface IEditarDadosProps {
  setTitle: (title: string) => void;
  setSubtitle: (title: string) => void;
}

export default function EditarDados({
  setTitle,
  setSubtitle,
}: IEditarDadosProps) {
  setTitle("Editar Dados");
  setSubtitle("Edite os dados do parceiro.");

  return (
    <div>
      <h1>EDITAR DADOS</h1>
    </div>
  );
}
