import { Box, Button, Container, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { ArrowRight } from "lucide-react"
import { CORES, TAMANHO, RADIUS_PADRAO_BOTAO } from '../../util/constants'
import fotoPotiguara from "@/assets/artesa-potiguara.jpeg"
import HoneycombBackgroundRed from "../general/HoneycombBackgroundRed"

const SobrePovoPotiguara = () => {
    return (
        <Box as="section" position="relative" bg={CORES.PRETO} py={{ base: 30, md: 35 }}>
            <HoneycombBackgroundRed />
            <Container maxW="container.lg" position="relative" zIndex={1}>
                <Stack gap={3} mb={10} align="flex-start">
                    <Flex
                        display="inline-flex"
                        align="center"
                        gap={2}
                        bg={CORES.BRANCO}
                        border={`2px solid ${CORES.PRETO}`}
                        borderRadius={`${RADIUS_PADRAO_BOTAO}px`}
                        px={4}
                        py={2}
                        mb={{ base: 6, md: 8 }}
                        transform="rotate(-3deg)"
                    >
                        <Box as="span" w="8px" h="8px" borderRadius="full" bg={CORES.VERMELHO_VIVO} />
                        <Text as="span" fontStyle="italic" color={CORES.PRETO} fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}>
                            Quem produz?
                        </Text>
                    </Flex>

                    <Heading
                        as="h2"
                        fontFamily="'Hashira', 'Fraunces', serif"
                        fontWeight="800"
                        fontSize={`${TAMANHO.TITULO_SECAO}px`}
                        color={CORES.BRANCO}
                    >
                        Sobre o povo Potiguara
                    </Heading>
                </Stack>

                <Image
                    src={fotoPotiguara}
                    alt="Artesã potiguara ao lado de mesa com colares artesanais"
                    borderRadius={`${RADIUS_PADRAO_BOTAO}px`}
                    objectFit="cover"
                    w="100%"
                    h={{ base: "220px", md: "340px" }}
                    mb={6}
                />

                <Text fontSize={`${TAMANHO.CORPO_TEXTO}px`} color={CORES.CINZA_CLARO} maxW="52ch">
                    O povo Potiguara vive no litoral norte da Paraíba, entre os municípios de
                    Baía da Traição, Marcação e Rio Tinto — sendo o maior povo indígena do
                    Nordeste brasileiro.
                </Text>

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
                    <a
                        href="/cultura"
                        style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
                    >
                        Conhecer cultura Potiguara
                        <ArrowRight size={18} />
                    </a>
                </Button>
            </Container>
        </Box>
    )
}

export default SobrePovoPotiguara