import { useEffect, useState } from 'react';

export const ExtrairLetras = ({ nome }: { nome: any }) => {
  const [iniciais, setIniciais] = useState('');

  const extrairIniciais = (nome: any) => {
    const palavras = nome.split(' ');

    if (palavras.length >= 2) {
      const primeiraLetra = palavras[0].charAt(0);
      const ultimaLetra = palavras[palavras.length - 1].charAt(0);
      setIniciais(`${primeiraLetra}${ultimaLetra}`);
    } else if (palavras.length === 1) {
      // Se houver apenas uma palavra, use a primeira letra duas vezes
      const primeiraLetra = palavras[0].charAt(0);
      setIniciais(`${primeiraLetra}${primeiraLetra}`);
    } else {
      // Trate o caso de uma string vazia ou sem palavras
      setIniciais('');
    }
  };

  // Chame a função de extração quando o componente for montado
  useEffect(() => {
    extrairIniciais(nome);
  }, [nome]);

  return <div>{iniciais}</div>;
};
