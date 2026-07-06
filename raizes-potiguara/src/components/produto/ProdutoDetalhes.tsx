// src/components/produto/ProdutoDetalhes.tsx
import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { CORES, TAMANHO, RADIUS_PADRAO_CARD } from '../../util/constants';
import type { Produto } from '../../types/produto';

interface ProdutoDetalhesProps {
  produto: Produto;
}

export const ProdutoDetalhes: React.FC<ProdutoDetalhesProps> = ({ produto }) => {
  if (!produto.materiaisInsumos && !produto.simbologia) return null;

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      gap={{ base: 8, md: 12 }}
      border={`2px solid ${CORES.PRETO}`}
      borderRadius={`${RADIUS_PADRAO_CARD}px`}
      p={{ base: 6, md: 10 }}
      mb={16}
    >
      {produto.materiaisInsumos && (
        <Box flex="1">
          <Text fontWeight="800" fontSize={`${TAMANHO.SUBTITULO_SECAO}px`} color={CORES.PRETO} mb={2}>
            Materiais e insumos
          </Text>
          <Text fontSize={`${TAMANHO.CORPO_TEXTO}px`} color={CORES.CINZA_ESCURO} lineHeight="tall">
            {produto.materiaisInsumos}
          </Text>
        </Box>
      )}

      {produto.simbologia && (
        <Box flex="1">
          <Text fontWeight="800" fontSize={`${TAMANHO.SUBTITULO_SECAO}px`} color={CORES.PRETO} mb={2}>
            Descrição e simbologia
          </Text>
          <Text fontSize={`${TAMANHO.CORPO_TEXTO}px`} color={CORES.CINZA_ESCURO} lineHeight="tall">
            {produto.simbologia}
          </Text>
        </Box>
      )}
    </Flex>
  );
};