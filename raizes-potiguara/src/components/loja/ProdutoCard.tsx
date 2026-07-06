import React from 'react';
import { Box, Flex, Image, Text, Button } from '@chakra-ui/react';
import { ShoppingBasket } from 'lucide-react';
import { CORES, TAMANHO, RADIUS_PADRAO_CARD, RADIUS_PADRAO_BOTAO } from '../../util/constants';
import type { Produto } from '../../types/produto';

interface ProdutoCardProps {
  produto: Produto;
  aoAdicionarAoCarrinho?: (produto: Produto) => void;
}

export const ProdutoCard: React.FC<ProdutoCardProps> = ({ produto, aoAdicionarAoCarrinho }) => {
  return (
    <Flex
      direction="column"
      bg={CORES.BRANCO}
      border={`2px solid ${CORES.PRETO}`}
      borderRadius={`${RADIUS_PADRAO_CARD}px`}
      overflow="hidden"
      boxShadow="4px 4px 0px rgba(0,0,0,0.2)"
      transition="all 0.2s ease-in-out"
      _hover={{ transform: 'translateY(-4px)', boxShadow: '6px 6px 0px rgba(0,0,0,0.25)' }}
    >
      <Box h="220px" w="100%" borderBottom={`2px solid ${CORES.PRETO}`} overflow="hidden">
        <Image
          src={produto.imagemUrl}
          alt={produto.nome}
          objectFit="cover"
          w="100%"
          h="100%"
        />
      </Box>

      <Flex direction="column" p={5} flex="1" gap={2}>
        <Text fontSize={`${TAMANHO.TEXTO_PEQUENO}px`} color={CORES.CINZA_ESCURO} fontWeight="bold">
          {produto.categoria}
        </Text>
        
        <Text
          fontFamily="'CabinetGrotesk-Variable', 'Fraunces', serif"
          fontWeight="800"
          fontSize={`${TAMANHO.SUBTITULO_SECAO}px`}
          color={CORES.PRETO}
          lineHeight={1.2}
        >
          {produto.nome}
        </Text>
        
        <Text fontSize={`${TAMANHO.TEXTO_PEQUENO}px`} color={CORES.CINZA_ESCURO} flex="1">
          {produto.descricao}
        </Text>

        <Flex align="center" justify="space-between" mt={4} pt={2}>
          <Text fontWeight="800" color={CORES.VERMELHO_MEDIO} fontSize={`${TAMANHO.TEXTO_BOTAO}px`}>
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}
          </Text>

          <Button
            onClick={() => aoAdicionarAoCarrinho?.(produto)}
            bg={CORES.PRETO}
            color={CORES.BRANCO}
            borderRadius={`${RADIUS_PADRAO_BOTAO}px`}
            size="sm"
            px={3}
            _hover={{ bg: CORES.VERMELHO_MEDIO }}
            _active={{ bg: CORES.VERMELHO_ESCURO }}
          >
            <ShoppingBasket size={18} />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};