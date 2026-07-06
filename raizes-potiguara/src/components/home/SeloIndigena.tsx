import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { Badge } from 'lucide-react';
import { CORES, TAMANHO, RADIUS_PADRAO_BOTAO } from '../../util/constants';

const SeloIndigenaSection = () => {
    return (
        <Box
            as="section"
            bg={CORES.PRETO}
            py={{ base: 12, md: 20 }}
            position="relative"
            overflow="hidden"
            w="100%"
        >
            <Box
                position="absolute"
                left="0"
                top="50%"
                transform="translate(-50%, -50%)"
                w={{ base: '240px', md: '500px', lg: '700px' }}
                h={{ base: '240px', md: '500px', lg: '700px' }}
                zIndex={0}
                pointerEvents="none"
            >
                <Badge
                    color={CORES.VERMELHO_VIVO}
                    strokeWidth={1.2}
                    width="100%"
                    height="100%"
                />
            </Box>

            <Container maxW="container.xl" position="relative" zIndex={1}>
                
                {/* Esta Box alinha a etiqueta e o título. 
                  No mobile (base e sm) não tem padding, ficando na esquerda. 
                  No desktop (md e lg), usa o mesmo padding do texto abaixo para alinhá-los perfeitamente.
                */}
                <Box pl={{ base: 0, sm: 0, md: '280px', lg: '400px' }}>
                    <Flex
                        display="inline-flex"
                        align="center"
                        gap={2}
                        bg={CORES.BRANCO}
                        border={`2px solid ${CORES.PRETO}`}
                        borderRadius={`${RADIUS_PADRAO_BOTAO}px`}
                        px={4}
                        py={2}
                        mb={{ base: 4, md: 6 }}
                        transform="rotate(-3deg)"
                    >
                        <Box as="span" w="8px" h="8px" borderRadius="full" bg={CORES.VERMELHO_VIVO} />
                        <Text as="span" fontStyle="italic" color={CORES.PRETO} fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}>
                            Por que apoiar?
                        </Text>
                    </Flex>

                    <Heading
                        as="h2"
                        fontFamily="hashira"
                        fontSize={`${TAMANHO.TITULO_SECAO}px`}
                        color={CORES.BRANCO}
                        mb={{ base: 6, md: 10 }}
                    >
                        O selo indígena
                    </Heading>
                </Box>

                {/* Bloco de texto mantido exatamente como estava */}
                <Box pl={{ base: '130px', sm: '150px', md: '280px', lg: '400px' }}>
                    <Text
                        fontFamily="cabinet"
                        fontWeight="semibold"
                        fontSize={`${TAMANHO.SUBTITULO_SECAO}px`}
                        color={CORES.BRANCO}
                        mb={3}
                    >
                        Por que comprar com o selo
                    </Text>

                    <Text
                        fontFamily="cabinet"
                        fontSize={`${TAMANHO.CORPO_TEXTO}px`}
                        color={CORES.CINZA_CLARO}
                        lineHeight="tall"
                        mb={4}
                    >
                        O selo garante que a peça foi feita à mão por artesãs potiguaras, com técnicas e
                        saberes passados de geração em geração. Ao comprar uma peça com esse selo, você:
                    </Text>

                    <Box
                        as="ul"
                        display="flex"
                        flexDirection="column"
                        gap={2}
                        fontFamily="cabinet"
                        fontSize={`${TAMANHO.CORPO_TEXTO}px`}
                        color={CORES.CINZA_CLARO}
                        lineHeight="tall"
                    >
                        <Flex as="li" align="baseline" gap={2}>
                            <Box as="span" flexShrink={0} w="6px" h="6px" borderRadius="full" bg={CORES.VERMELHO_VIVO} mt={1.5} />
                            <Text>
                                Fortalece{' '}
                                <Text as="strong" color={CORES.BRANCO}>
                                    a economia indígena
                                </Text>
                            </Text>
                        </Flex>

                        <Flex as="li" align="baseline" gap={2}>
                            <Box as="span" flexShrink={0} w="6px" h="6px" borderRadius="full" bg={CORES.VERMELHO_VIVO} mt={1.5} />
                            <Text>
                                Valoriza{' '}
                                <Text as="strong" color={CORES.BRANCO}>
                                    a cultura potiguara
                                </Text>
                            </Text>
                        </Flex>

                        <Flex as="li" align="baseline" gap={2}>
                            <Box as="span" flexShrink={0} w="6px" h="6px" borderRadius="full" bg={CORES.VERMELHO_VIVO} mt={1.5} />
                            <Text>
                                Ajuda a manter{' '}
                                <Text as="strong" color={CORES.BRANCO}>
                                    uma tradição viva
                                </Text>
                            </Text>
                        </Flex>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default SeloIndigenaSection;