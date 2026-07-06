import { PRODUTOS_MOCK } from '../components/loja/produtosMock';
import type { Produto } from '../types/produto';

export const buscarProdutoPorId = async (id: string): Promise<Produto | undefined> => {
  // TODO: substituir por chamada real
  return PRODUTOS_MOCK.find((produto) => produto.id === id);
};

export const buscarProdutosRelacionados = async (
  produtoAtual: Produto,
  limite = 4,
): Promise<Produto[]> => {
  // TODO: substituir por chamada real
  return PRODUTOS_MOCK.filter(
    (produto) => produto.categoria === produtoAtual.categoria && produto.id !== produtoAtual.id,
  ).slice(0, limite);
};