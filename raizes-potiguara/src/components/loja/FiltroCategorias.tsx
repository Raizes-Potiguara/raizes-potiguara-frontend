import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { CORES, TAMANHO, RADIUS_PADRAO_BOTAO } from '../../util/constants';
import type { CategoriaProduto } from '../../types/produto';

export type CategoriaFiltro = 'Todos' | CategoriaProduto;

interface FiltroCategoriasProps {
  categoriaAtual: CategoriaFiltro;
  aoMudarCategoria: (categoria: CategoriaFiltro) => void;
}

const CATEGORIAS: CategoriaFiltro[] = ['Todos', 'Cestaria', 'Biojoias', 'Pinturas'];

export const FiltroCategorias: React.FC<FiltroCategoriasProps> = ({ 
  categoriaAtual, 
  aoMudarCategoria 
}) => {
  return (
    <Flex gap={3} wrap="wrap" mb={10} justify="center" w="100%">
      {CATEGORIAS.map((categoria) => {
        const estaAtivo = categoriaAtual === categoria;

        return (
          <Button
            key={categoria}
            onClick={() => aoMudarCategoria(categoria)}
            bg={estaAtivo ? CORES.VERMELHO_MEDIO : 'transparent'}
            color={estaAtivo ? CORES.BRANCO : CORES.PRETO}
            border={`2px solid ${CORES.PRETO}`}
            borderRadius={`${RADIUS_PADRAO_BOTAO}px`}
            fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}
            fontWeight="bold"
            px={6}
            _hover={{
              bg: estaAtivo ? CORES.VERMELHO_ESCURO : CORES.CINZA_CLARINHO,
            }}
            _active={{
              bg: estaAtivo ? CORES.VERMELHO_ESCURO : CORES.CREME,
            }}
          >
            {categoria}
          </Button>
        );
      })}
    </Flex>
  );
};