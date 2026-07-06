import React, { useState } from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import { ArrowLeftRight, Minus, Plus, ShoppingBasket } from 'lucide-react';
import { CORES, TAMANHO, RADIUS_PADRAO_BOTAO } from '../../util/constants';
import type { Produto } from '../../types/produto';

interface ProdutoInfoProps {
    produto: Produto;
    aoAdicionarAoCarrinho?: (produto: Produto, quantidade: number) => void;
}

export const ProdutoInfo: React.FC<ProdutoInfoProps> = ({ produto, aoAdicionarAoCarrinho }) => {
    const [quantidade, setQuantidade] = useState(1);

    return (
        <Flex direction="column" gap={4}>
            <Text fontSize={`${TAMANHO.TEXTO_PEQUENO}px`} color={CORES.CINZA_ESCURO} fontWeight="bold">
                {produto.categoria}
            </Text>

            <Flex align="center" gap={3}>
                <Text
                    as="h1"
                    fontFamily="'Hashira', 'Fraunces', serif"
                    fontWeight="800"
                    fontSize={`${TAMANHO.TITULO_PAGINA}px`}
                    color={CORES.PRETO}
                    lineHeight={1.15}
                >
                    {produto.nome}
                </Text>

                <Button
                    aria-label="Comparar produto"
                    onClick={() => {/* TODO: ação e traduzir */ }}
                    bg="transparent"
                    borderRadius={`${RADIUS_PADRAO_BOTAO}px`}
                    minW="auto"
                    w="36px"
                    h="36px"
                    p={0}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    _hover={{ bg: CORES.CINZA_CLARINHO }}
                    _active={{ bg: CORES.CREME }}
                >
                    <ArrowLeftRight color={CORES.PRETO} size={18} />
                </Button>
            </Flex>

            <Text fontSize={`${TAMANHO.CORPO_TEXTO}px`} color={CORES.CINZA_ESCURO} lineHeight="tall">
                {produto.descricao}
            </Text>

            <Text fontWeight="800" color={CORES.VERMELHO_MEDIO} fontSize={`${TAMANHO.TITULO_SECAO}px`} mt={2}>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}
            </Text>

            <Flex direction={{ base: 'column', sm: 'row' }} align={{ base: 'stretch', sm: 'center' }} gap={4} mt={4}>
                <Flex align="center" justify="center" border={`2px solid ${CORES.CINZA_CLARINHO}`} borderRadius={`${RADIUS_PADRAO_BOTAO}px`}>
                    <Button onClick={() => setQuantidade((q) => Math.max(1, q - 1))} variant="ghost" px={3} _hover={{ bg: CORES.CINZA_CLARINHO }}>
                        <Minus size={16} />
                    </Button>
                    <Text minW="32px" textAlign="center" fontWeight="bold" color={CORES.PRETO}>
                        {quantidade}
                    </Text>
                    <Button onClick={() => setQuantidade((q) => q + 1)} variant="ghost" px={3} _hover={{ bg: CORES.CINZA_CLARINHO }}>
                        <Plus size={16} />
                    </Button>
                </Flex>

                <Button
                    onClick={() => aoAdicionarAoCarrinho?.(produto, quantidade)}
                    bg={CORES.PRETO}
                    color={CORES.BRANCO}
                    borderRadius={`${RADIUS_PADRAO_BOTAO}px`}
                    fontSize={`${TAMANHO.TEXTO_BOTAO}px`}
                    px={6}
                    py={6}
                    flex="1"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                    _hover={{ bg: CORES.VERMELHO_MEDIO }}
                    _active={{ bg: CORES.VERMELHO_ESCURO }}
                >
                    <ShoppingBasket size={18} />
                    Adicionar ao carrinho
                </Button>
            </Flex>
        </Flex>
    );
};