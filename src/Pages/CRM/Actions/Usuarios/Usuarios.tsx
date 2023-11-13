interface IUsuariosProps {
  setTitle: (title: string) => void;
  setSubtitle: (title: string) => void;
}

export default function Usuarios({ setTitle, setSubtitle }: IUsuariosProps) {
  setTitle("Usuários");
  setSubtitle("Gerencie os usuários do parceiro selecionado.");

  return (
    <div>
      <h1>USUÁRIOS</h1>
    </div>
  );
}
