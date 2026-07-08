export type CategoriaProduto = 'Cestaria' | 'Biojoias' | 'Pinturas';

export interface Produto {
  id: string;
  nomePortugues: string;
  nomeTupi: string;
  descricao: string;
  preco: number;
  categorias: CategoriaProduto[];
  imagemUrl: string;
  quantidadeEstoque: number;
}