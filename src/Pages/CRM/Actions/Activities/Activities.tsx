interface IAtividadesProps {
  setTitle: (title: string) => void;
  setSubtitle: (title: string) => void;
}

export default function Activities({ setTitle, setSubtitle }: IAtividadesProps) {
  setTitle('Atividade Geral');
  setSubtitle('Visualize as atividades realizadas com os parceiros.');

  return (
    <div>
      <h1>ATIVIDADES GERAIS</h1>
    </div>
  );
}
