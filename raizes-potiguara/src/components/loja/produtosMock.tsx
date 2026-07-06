import type { Produto } from '../../types/produto';
import cestoImg from '@/assets/cesto.png';
import colarImg from '@/assets/colar.png';
import pulseiraImg from '@/assets/pulseira.png';
import brincoImg from '@/assets/brinco.png';

export const PRODUTOS_MOCK: Produto[] = [
  {
    id: '1',
    nome: 'Cesto',
    descricao: 'Cesto trançado à mão com fibras de taboa legítimas.',
    preco: 120.0,
    categoria: 'Cestaria',
    imagemUrl: cestoImg,
  },
  {
    id: '2',
    nome: 'Colar Semente de Açaí',
    descricao: 'Biojoia feita com sementes naturais selecionadas e miçangas.',
    preco: 45.0,
    categoria: 'Biojoias',
    imagemUrl: colarImg,
  },
  {
    id: '3',
    nome: 'Brinco',
    descricao: 'Pintura feita com pigmentos naturais representando grafismos tradicionais.',
    preco: 250.0,
    categoria: 'Biojoias',
    imagemUrl: brincoImg,
  },
  {
    id: '4',
    nome: 'Pulseira',
    descricao: 'Bandeja decorativa tecida meticulosamente com palha de alta qualidade.',
    preco: 85.0,
    categoria: 'Biojoias',
    imagemUrl: pulseiraImg,
  },
];