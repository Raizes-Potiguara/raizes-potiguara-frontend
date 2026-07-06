import React, { useEffect, useState } from 'react';
import { Box, Container, Flex, Grid, GridItem, Spinner, Text } from '@chakra-ui/react';
import { CORES, TAMANHO } from '../../util/constants';
import { buscarProdutoPorId} from '../../services/produtoService';
import { ProdutoGaleria } from './ProdutoGaleria';
import { ProdutoInfo } from './ProdutoInfo';
import { ProdutoDetalhes } from './ProdutoDetalhes';
import type { Produto } from '../../types/produto';
import HoneycombBackgroundProduto from '../general/HoneycombBackgroundProduto';

interface ProdutoSecaoProps {
  produtoId: string;
}

const ProdutoSecao: React.FC<ProdutoSecaoProps> = ({ produtoId }) => {
  const [produto, setProduto] = useState<Produto | null | undefined>(undefined);

  useEffect(() => {
    let ativo = true;

    const carregar = async () => {
      setProduto(undefined);

      const encontrado = await buscarProdutoPorId(produtoId);
      if (!ativo) return;
      setProduto(encontrado ?? null);
    };

    carregar();
    return () => {
      ativo = false;
    };
  }, [produtoId]);

  const lidarComAdicionarCarrinho = (produtoSelecionado: Produto, quantidade: number) => {
    console.log('Adicionado ao carrinho:', produtoSelecionado.nome, 'x', quantidade);
  };

  if (produto === undefined) {
    return (
      <Flex as="main" bg={CORES.BRANCO} minH="100vh" align="center" justify="center">
        <Spinner color={CORES.VERMELHO_MEDIO} size="lg" />
      </Flex>
    );
  }

  if (produto === null) {
    return (
      <Flex as="main" bg={CORES.BRANCO} minH="100vh" align="center" justify="center" direction="column" gap={2}>
        <Text fontSize={`${TAMANHO.SUBTITULO_PAGINA}px`} fontWeight="800" color={CORES.PRETO}>
          Produto não encontrado
        </Text>
        <Text color={CORES.CINZA_ESCURO} fontSize={`${TAMANHO.CORPO_TEXTO}px`}>
          Esse item pode ter sido removido ou o link está incorreto.
        </Text>
      </Flex>
    );
  }

  return (
    <Box as="main" bg={CORES.BRANCO} minH="100vh" py={{ base: 6, md:12 }} position="relative">

      <HoneycombBackgroundProduto />
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={{ base: 8, md: 12 }} mb={16}>
          <GridItem>
            <ProdutoGaleria produto={produto} />
          </GridItem>
          <GridItem>
            <ProdutoInfo produto={produto} aoAdicionarAoCarrinho={lidarComAdicionarCarrinho} />
          </GridItem>
        </Grid>

        <ProdutoDetalhes produto={produto} />
      </Container>

    </Box>
  );
};

export default ProdutoSecao;