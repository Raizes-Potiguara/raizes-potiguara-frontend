import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { CORES, RADIUS_PADRAO_CARD } from '../../util/constants';
import type { Produto } from '../../types/produto';

interface ProdutoGaleriaProps {
  produto: Produto;
}

export const ProdutoGaleria: React.FC<ProdutoGaleriaProps> = ({ produto }) => {
  return (
    <Box
      w="100%"
      maxW={{ base: '100%', md: '480px' }}
      mx={{ base: 0, md: 'auto' }}
      aspectRatio={1}
      border={`2px solid ${CORES.CINZA_CLARO}`}
      dropShadow='sm'
      borderRadius={`${RADIUS_PADRAO_CARD}px`}
      overflow="hidden"
    >
      {produto.imagemUrl ? (
        <Image src={produto.imagemUrl} alt={produto.nomePortugues} objectFit="cover" w="100%" h="100%" />
      ) : (
        <Flex
          bg={CORES.CINZA_CLARINHO}
          color={CORES.CINZA_ESCURO}
          align="center"
          justify="center"
          textAlign="center"
          w="100%"
          h="100%"
          px={4}
        >
          <Text fontWeight="bold">foto não adicionada</Text>
        </Flex>
      )}
    </Box>
  );
};
