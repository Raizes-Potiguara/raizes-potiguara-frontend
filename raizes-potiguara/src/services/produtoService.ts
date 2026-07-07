import { PRODUTOS_MOCK } from '../components/loja/produtosMock';
import { ApiService, type ProdutoComercializacaoItem } from './apiService';
import type { CategoriaProduto } from '../types/produto';
import type { Produto } from '../types/produto';

export const buscarProdutosLoja = async (): Promise<Produto[]> => {
  try {
    const produtosBackend = await ApiService.listarProdutosComercializacao();
    return [...PRODUTOS_MOCK, ...produtosBackend.map(normalizarProdutoBackend)];
  } catch {
    return PRODUTOS_MOCK;
  }
};

export const buscarProdutoPorId = async (id: string): Promise<Produto | undefined> => {
  const produtos = await buscarProdutosLoja();
  return produtos.find((produto) => produto.id === id);
};

export const buscarProdutosRelacionados = async (
  produtoAtual: Produto,
  limite = 4,
): Promise<Produto[]> => {
  const produtos = await buscarProdutosLoja();
  return produtos.filter(
    (produto) =>
      produto.id !== produtoAtual.id &&
      produto.categorias.some((categoria) => produtoAtual.categorias.includes(categoria)),
  ).slice(0, limite);
};

const normalizarProdutoBackend = (produto: ProdutoComercializacaoItem): Produto => {
  const imagem = produto.foto_url || produto.imagem_url || '';

  return {
    id: `real-${produto.id}`,
    nomePortugues: produto.nome,
    nomeTupi: produto.nome_potiguar || produto.nome,
    descricao: produto.descricao,
    preco: Number(produto.preco),
    categorias: normalizarCategorias(produto),
    imagemUrl: normalizarImagemProduto(imagem),
    quantidadeEstoque: produto.quantidade_estoque,
  };
};

const normalizarImagemProduto = (imagem: string): string => {
  if (!imagem || imagem.startsWith('upload://')) {
    return PRODUTOS_MOCK[0].imagemUrl;
  }

  return ApiService.montarUrlBackend(imagem);
};

const normalizarCategorias = (produto: ProdutoComercializacaoItem): CategoriaProduto[] => {
  const texto = `${produto.nome} ${(produto.tags || []).join(' ')}`.toLowerCase();
  const categorias = new Set<CategoriaProduto>();

  if (texto.includes('cesto') || texto.includes('cestaria') || texto.includes('fibra')) {
    categorias.add('Cestaria');
  }

  if (texto.includes('pintura') || texto.includes('grafismo')) {
    categorias.add('Pinturas');
  }

  if (
    texto.includes('colar') ||
    texto.includes('pulseira') ||
    texto.includes('brinco') ||
    texto.includes('biojoia') ||
    texto.includes('miçanga') ||
    texto.includes('micanga')
  ) {
    categorias.add('Biojoias');
  }

  if (categorias.size === 0) {
    categorias.add('Biojoias');
  }

  return Array.from(categorias);
};
