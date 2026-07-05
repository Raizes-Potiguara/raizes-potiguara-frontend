import { Box, Button, Container, Flex, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import { ArrowRight, ShoppingBasket, Gem, Paintbrush } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { CORES, TAMANHO, RADIUS_PADRAO } from '../../util/constants';

interface Categoria {
    icon: LucideIcon
    titulo: string
    descricao: string
}

const categorias: Categoria[] = [
    {
        icon: ShoppingBasket,
        titulo: "Cestaria",
        descricao: "Palha e taboa trançadas em cestos, bandejas e potes.",
    },
    {
        icon: Gem,
        titulo: "Biojoias",
        descricao: "Sementes e miçangas naturais transformadas em colares e adornos.",
    },
    {
        icon: Paintbrush,
        titulo: "Pinturas",
        descricao: "Pigmentos naturais aplicados em peças e grafismos potiguara.",
    },
]

const ArtesanatoAncestral = () => {
    return (
        <Box as="section" bg={CORES.BRANCO} py={{ base: 12, md: 16 }}>
            <Container maxW="container.lg">
                <Stack gap={3} mb={10} align="flex-start">
                    <Flex
                        display="inline-flex"
                        align="center"
                        gap={2}
                        bg={CORES.BRANCO}
                        border={`2px solid ${CORES.PRETO}`}
                        borderRadius={`${RADIUS_PADRAO}px`}
                        px={4}
                        py={2}
                        mb={{ base: 6, md: 8 }}
                        transform="rotate(-3deg)"
                    >
                        <Box as="span" w="8px" h="8px" borderRadius="full" bg={CORES.VERMELHO_VIVO} />
                        <Text as="span" fontStyle="italic" color={CORES.PRETO} fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}>
                            Artesanato Ancestral
                        </Text>
                    </Flex>

                    <Heading
                        as="h2"
                        fontFamily="'Hashira', 'Fraunces', serif"
                        fontWeight="800"
                        fontSize={`${TAMANHO.TITULO_SECAO}px`}
                        color={CORES.PRETO}
                    >
                        Artesanato ancestral
                    </Heading>
                </Stack>

                <SimpleGrid columns={{ base: 1, sm: 3 }} gap={5}>
                    {categorias.map(({ icon: Icon, titulo, descricao }) => (
                        <Box
                            key={titulo}
                            bg={CORES.VERMELHO_ESCURO}
                            color={CORES.BRANCO}
                            borderRadius="4px"
                            p={6}
                        >
                            <Icon size={28} color={CORES.BRANCO} strokeWidth={1.75} />
                            <Text
                                mt={4}
                                fontFamily="'Hashira', 'Fraunces', serif"
                                fontWeight="800"
                                fontSize={`${TAMANHO.TITULO_SUBSECAO}px`}
                            >
                                {titulo}
                            </Text>
                            <Text mt={2} fontSize={`${TAMANHO.TEXTO_PEQUENO}px`} color={CORES.CINZA_CLARO}>
                                {descricao}
                            </Text>
                        </Box>
                    ))}
                </SimpleGrid>

                <Button
                    asChild
                    mt={10}
                    bg={CORES.VERMELHO_MEDIO}
                    color={CORES.BRANCO}
                    borderRadius="full"
                    fontWeight="700"
                    fontSize={`${TAMANHO.TEXTO_BOTAO}px`}
                    px={6}
                    _hover={{ bg: CORES.VERMELHO_VIVO }}
                >
                    <a href="/loja" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                        Visitar a loja
                        <ArrowRight size={18} />
                    </a>
                </Button>
            </Container>
        </Box>
    )
}

export default ArtesanatoAncestral
