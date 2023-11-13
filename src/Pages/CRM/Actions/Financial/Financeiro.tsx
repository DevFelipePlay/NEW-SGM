interface IFinanceiroProps {
  setTitle: (title: string) => void;
  setSubtitle: (title: string) => void;
}

export default function Financeiro({
  setTitle,
  setSubtitle,
}: IFinanceiroProps) {
  setTitle("Financeiro");
  setSubtitle("Visualize o financeiro do parceiro.");

  return (
    <div>
      <h1>FINANCEIRO</h1>
    </div>
  );
}
