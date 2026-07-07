import type { Produto } from '../../types/produto';
import cestoImg from '@/assets/cesto.png';
import colarImg from '@/assets/colar.png';
import pulseiraImg from '@/assets/pulseira.png';
import brincoImg from '@/assets/brinco.png';

// Observação sobre os nomes em tupi: "Jacá" (cesto) é um termo bem documentado
// em dicionários de tupi. Os demais ("colar", "pulseira", "brinco") são
// EXEMPLOS/placeholders — não encontramos fontes confiáveis para esses termos
// especificamente em tupi potiguara. Vale validar com a comunidade/linguista
// antes de publicar de verdade.
export const PRODUTOS_MOCK: Produto[] = [
  {
    id: '1',
    nomePortugues: 'Cesto',
    nomeTupi: 'Jacá',
    descricao: 'Cesto trançado à mão com fibras de taboa legítimas.',
    preco: 120.0,
    categorias: ['Cestaria'],
    imagemUrl: cestoImg,
    quantidadeEstoque: 8,
  },
  {
    id: '2',
    nomePortugues: 'Colar Semente de Açaí',
    nomeTupi: 'Yba Poti (placeholder)',
    descricao: 'Biojoia feita com sementes naturais selecionadas e miçangas.',
    preco: 45.0,
    categorias: ['Biojoias'],
    imagemUrl: colarImg,
    quantidadeEstoque: 15,
  },
  {
    id: '3',
    nomePortugues: 'Brinco',
    nomeTupi: 'Nambi Sã (placeholder)',
    // pertence a duas categorias: é uma biojoia com técnica de pintura aplicada
    descricao: 'Pintura feita com pigmentos naturais representando grafismos tradicionais.',
    preco: 250.0,
    categorias: ['Biojoias', 'Pinturas'],
    imagemUrl: brincoImg,
    quantidadeEstoque: 0,
  },
  {
    id: '4',
    nomePortugues: 'Pulseira',
    nomeTupi: 'Ynimbo Poti (placeholder)',
    // pertence a duas categorias: técnica de trançado (cestaria) usada em uma biojoia
    descricao: 'Bandeja decorativa tecida meticulosamente com palha de alta qualidade.',
    preco: 85.0,
    categorias: ['Cestaria', 'Biojoias'],
    imagemUrl: pulseiraImg,
    quantidadeEstoque: 5,
  },
];