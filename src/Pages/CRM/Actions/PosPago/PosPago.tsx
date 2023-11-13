interface IPosPagoProps {
  setTitle: (title: string) => void;
  setSubtitle: (title: string) => void;
}

export default function PosPago({ setTitle, setSubtitle }: IPosPagoProps) {
  setTitle("Faturas Pós-Pago | Play");
  setSubtitle("Visualize as faturas referente ao Pós-Pago do parceiro.");

  return (
    <div>
      <h1>USUÁRIOS</h1>
    </div>
  );
}
