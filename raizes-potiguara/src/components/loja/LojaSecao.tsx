import React, { useEffect, useState } from 'react';
import { Box, Container, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { CORES, TAMANHO } from '../../util/constants';
import { LojaHeader } from './LojaHeader';
import { FiltroCategorias, type CategoriaFiltro } from './FiltroCategorias';
import { ProdutoCard } from './ProdutoCard';
import { PRODUTOS_MOCK } from './produtosMock';
import type { Produto } from '../../types/produto';
import { buscarProdutosLoja } from '../../services/produtoService';

interface LojaSecaoProps {
  produtos?: Produto[];
}

const LojaSecao: React.FC<LojaSecaoProps> = ({ produtos }) => {
  const [categoriaAtiva, setCategoriaAtiva] = useState<CategoriaFiltro>('Todos');
  const [produtosDaLoja, setProdutosDaLoja] = useState<Produto[]>(produtos ?? PRODUTOS_MOCK);

  useEffect(() => {
    if (produtos) {
      setProdutosDaLoja(produtos);
      return;
    }

    let ativo = true;

    buscarProdutosLoja().then((produtosCarregados) => {
      if (ativo) {
        setProdutosDaLoja(produtosCarregados);
      }
    });

    return () => {
      ativo = false;
    };
  }, [produtos]);

  const produtosFiltrados = produtosDaLoja.filter((produto) => {
    if (categoriaAtiva === 'Todos') return true;
    return produto.categorias.includes(categoriaAtiva);
  });

  const lidarComAdicionarCarrinho = (produto: Produto) => {
    console.log('Adicionado ao carrinho:', produto.nomePortugues);
  };

  return (
    <Box as="main" bg={CORES.BRANCO} minH="100vh" py={{ base: 12, md: 20 }}>
      <Container maxW="container.xl">
        <LojaHeader />

        <FiltroCategorias
          categoriaAtual={categoriaAtiva}
          aoMudarCategoria={setCategoriaAtiva}
        />

        {produtosFiltrados.length > 0 ? (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={6}>
            {produtosFiltrados.map((produto) => (
              <ProdutoCard 
                key={produto.id} 
                produto={produto} 
                aoAdicionarAoCarrinho={lidarComAdicionarCarrinho}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Flex justify="center" py={12}>
            <Text color={CORES.CINZA_ESCURO} fontSize={`${TAMANHO.CORPO_TEXTO}px`}>
              Nenhum produto encontrado nesta categoria no momento.
            </Text>
          </Flex>
        )}
      </Container>
    </Box>
  );
};

export default LojaSecao;
