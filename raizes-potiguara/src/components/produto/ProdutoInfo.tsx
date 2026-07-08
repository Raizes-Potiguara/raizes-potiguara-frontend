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
    const semEstoque = produto.quantidadeEstoque <= 0;
    const [quantidade, setQuantidade] = useState(semEstoque ? 0 : 1);

    // false = nome exibido em português; true = nome exibido em tupi potiguara
    const [mostrarTupi, setMostrarTupi] = useState(false);

    const nomeExibido = mostrarTupi ? produto.nomeTupi : produto.nomePortugues;
    const corNome = mostrarTupi ? CORES.VERMELHO_VIVO : CORES.PRETO;

    const diminuirQuantidade = () => setQuantidade((q) => Math.max(1, q - 1));
    const aumentarQuantidade = () => setQuantidade((q) => Math.min(produto.quantidadeEstoque, q + 1));

    return (
        <Flex direction="column" gap={4}>
            <Flex gap={2} wrap="wrap">
                {produto.categorias.map((categoria) => (
                    <Text
                        key={categoria}
                        fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}
                        color={CORES.CINZA_ESCURO}
                        fontWeight="bold"
                        bg={CORES.CINZA_CLARINHO}
                        borderRadius={`${RADIUS_PADRAO_BOTAO}px`}
                        px={2}
                        py={0.5}
                    >
                        {categoria}
                    </Text>
                ))}
            </Flex>

            <Flex align="center" gap={3}>
                <Text
                    as="h1"
                    fontFamily="'Hashira', 'Fraunces', serif"
                    fontWeight="800"
                    fontSize={`${TAMANHO.TITULO_PAGINA}px`}
                    color={corNome}
                    lineHeight={1.15}
                    transition="color 0.15s ease"
                >
                    {nomeExibido}
                </Text>

                <Button
                    aria-label={mostrarTupi ? 'Ver nome em português' : 'Ver nome em tupi potiguara'}
                    onClick={() => setMostrarTupi((atual) => !atual)}
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
                    <ArrowLeftRight color={corNome} size={18} />
                </Button>
            </Flex>

            <Text fontSize={`${TAMANHO.CORPO_TEXTO}px`} color={CORES.CINZA_ESCURO} lineHeight="tall">
                {produto.descricao}
            </Text>

            <Text fontWeight="800" color={CORES.VERMELHO_MEDIO} fontSize={`${TAMANHO.TITULO_SECAO}px`} mt={2}>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}
            </Text>

            <Text
                fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}
                color={semEstoque ? CORES.VERMELHO_VIVO : CORES.CINZA_ESCURO}
                fontWeight="bold"
            >
                {semEstoque ? 'Esgotado' : `${produto.quantidadeEstoque} em estoque`}
            </Text>

            <Flex direction={{ base: 'column', sm: 'row' }} align={{ base: 'stretch', sm: 'center' }} gap={4} mt={4}>
                <Flex
                    align="center"
                    justify="center"
                    border={`2px solid ${CORES.CINZA_CLARINHO}`}
                    borderRadius={`${RADIUS_PADRAO_BOTAO}px`}
                    opacity={semEstoque ? 0.5 : 1}
                >
                    <Button
                        onClick={diminuirQuantidade}
                        variant="ghost"
                        px={3}
                        disabled={semEstoque || quantidade <= 1}
                        _hover={{ bg: CORES.CINZA_CLARINHO }}
                    >
                        <Minus size={16} />
                    </Button>
                    <Text minW="32px" textAlign="center" fontWeight="bold" color={CORES.PRETO}>
                        {quantidade}
                    </Text>
                    <Button
                        onClick={aumentarQuantidade}
                        variant="ghost"
                        px={3}
                        disabled={semEstoque || quantidade >= produto.quantidadeEstoque}
                        _hover={{ bg: CORES.CINZA_CLARINHO }}
                    >
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
                    disabled={semEstoque}
                    _hover={{ bg: CORES.VERMELHO_MEDIO }}
                    _active={{ bg: CORES.VERMELHO_ESCURO }}
                    _disabled={{ bg: CORES.CINZA_CLARO, cursor: 'not-allowed' }}
                >
                    <ShoppingBasket size={18} />
                    {semEstoque ? 'Esgotado' : 'Adicionar ao carrinho'}
                </Button>
            </Flex>
        </Flex>
    );
};