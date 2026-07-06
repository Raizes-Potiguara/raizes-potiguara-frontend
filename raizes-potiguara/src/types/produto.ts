export type CategoriaProduto = 'Cestaria' | 'Biojoias' | 'Pinturas';

export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: CategoriaProduto;
  imagemUrl: string;
  imagens?: string[];
  materiaisInsumos?: string;
  simbologia?: string;//categoria cultural
}