import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { CORES, TAMANHO, RADIUS_PADRAO_BOTAO } from '../../util/constants';

export const LojaHeader: React.FC = () => {
  return (
    <Flex direction="column" align="center" textAlign="center" mb={12}>
      <Flex
        display="inline-flex"
        align="center"
        gap={2}
        bg={CORES.BRANCO}
        border={`2px solid ${CORES.PRETO}`}
        borderRadius={`${RADIUS_PADRAO_BOTAO}px`}
        px={4}
        py={2}
        mb={6}
        transform="rotate(-2deg)"
      >
        <Box as="span" w="8px" h="8px" borderRadius="full" bg={CORES.VERMELHO_VIVO} />
        <Text as="span" fontStyle="italic" color={CORES.PRETO} fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}>
          Catálogo Ybirá
        </Text>
      </Flex>

      <Heading
        as="h1"
        fontFamily="'Hashira', 'Fraunces', serif"
        fontWeight="800"
        fontSize={`${TAMANHO.TITULO_PAGINA}px`}
        color={CORES.PRETO}
        mb={4}
      >
        Leve a ancestralidade com você
      </Heading>
      
      <Text fontSize={`${TAMANHO.CORPO_TEXTO}px`} color={CORES.CINZA_CLARO} maxW="600px">
        Explore nossas coleções exclusivas de cestarias, biojoias e pinturas, 
        feitas pelas mãos talentosas dos artesãos Potiguara.
      </Text>
    </Flex>
  );
};