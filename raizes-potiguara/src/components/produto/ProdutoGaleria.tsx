// src/components/produto/ProdutoGaleria.tsx
import React, { useState } from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';
import { CORES, RADIUS_PADRAO_CARD, RADIUS_PADRAO_BOTAO } from '../../util/constants';
import type { Produto } from '../../types/produto';
import HoneycombBackgroundProduto from '../general/HoneycombBackgroundProduto';

interface ProdutoGaleriaProps {
  produto: Produto;
}

export const ProdutoGaleria: React.FC<ProdutoGaleriaProps> = ({ produto }) => {
  const imagens = produto.imagens?.length ? produto.imagens : [produto.imagemUrl];
  const [imagemAtiva, setImagemAtiva] = useState(0);

  return (
    <Flex direction="column" gap={4}>
      <Box
        w="100%"
        aspectRatio={1}
        border={`2px solid ${CORES.CINZA_CLARO}`}
        dropShadow='sm'
        borderRadius={`${RADIUS_PADRAO_CARD}px`}
        overflow="hidden"
      >
        <Image src={imagens[imagemAtiva]} alt={produto.nome} objectFit="cover" w="100%" h="100%" />
      </Box>

      {imagens.length > 1 && (
        <Flex gap={3} wrap="wrap">
          {imagens.map((imagem, indice) => (
            <Box
              key={imagem + indice}
              as="button"
              onClick={() => setImagemAtiva(indice)}
              w="72px"
              h="72px"
              border={`2px solid ${indice === imagemAtiva ? CORES.VERMELHO_VIVO : CORES.CINZA_CLARO}`}
              borderRadius={`${RADIUS_PADRAO_BOTAO}px`}
              overflow="hidden"
              opacity={indice === imagemAtiva ? 1 : 0.6}
              transition="opacity 0.2s ease-in-out"
            >
              <Image src={imagem} alt={`${produto.nome} - imagem ${indice + 1}`} objectFit="cover" w="100%" h="100%" />
            </Box>
          ))}
        </Flex>
      )}
    </Flex>
  );
};