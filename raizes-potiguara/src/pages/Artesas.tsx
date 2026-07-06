import HoneycombBackgroundRed from "@/components/general/HoneycombBackgroundRed";
import fotoPotiguara from "@/assets/artesa-potiguara.jpeg";
import fotoArtesanatoMesa from "@/assets/cultura-artesanato-mesa.jpeg";
import fotoAldeasColetivo from "@/assets/cultura-aldeas-coletivo.jpeg";
import fotoArtesasRetrato from "@/assets/cultura-artesas-retrato.jpeg";
import fotoAssociacaoPotiguara from "@/assets/cultura-associacao-potiguara.jpeg";
import { CORES, RADIUS_PADRAO_BOTAO, TAMANHO } from "@/util/constants";
import { Badge, Box, Container, Flex, Heading, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, Gem, Globe, MapPin, Sprout, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";

const artesas = [
  {
    nome: "Artesa da Aldeia Sao Francisco",
    aldeia: "Sao Francisco",
    producao: "biojoias, colares e pulseiras",
    historia:
      "Aprendeu observando as mulheres da familia e transforma sementes em pecas de uso cotidiano e de memoria afetiva.",
    materiais: ["sementes", "micangas", "fios"],
  },
  {
    nome: "Artesa da Aldeia Forte",
    aldeia: "Forte",
    producao: "cestaria e trancados",
    historia:
      "Trabalha com fibras e cipos, mantendo tecnicas de trancado que organizam tempo, paciencia e conhecimento do territorio.",
    materiais: ["cipos", "fibras", "palha"],
  },
  {
    nome: "Artesa da Aldeia Galego",
    aldeia: "Galego",
    producao: "brincos, adornos e chaveiros",
    historia:
      "Produz pequenas pecas para feiras e encomendas, buscando renda mais justa sem depender de atravessadores.",
    materiais: ["sementes", "conchas", "linhas"],
  },
  {
    nome: "Artesa da Aldeia Cumaru",
    aldeia: "Cumaru",
    producao: "pinturas e pecas decorativas",
    historia:
      "Usa grafismos e cores para aproximar a peca da identidade potiguara e das historias contadas na comunidade.",
    materiais: ["pigmentos", "madeira", "fibras"],
  },
  {
    nome: "Artesa da Aldeia Tramataia",
    aldeia: "Tramataia",
    producao: "colares, tornozeleiras e amuletos",
    historia:
      "Cria adornos ligados ao mar e aos caminhos da aldeia, valorizando a autonomia economica das mulheres.",
    materiais: ["conchas", "sementes", "cordoes"],
  },
];

const fotosArtesas = [
  {
    src: fotoArtesanatoMesa,
    alt: "Mesa com colares e biojoias potiguara feitos com sementes",
    legenda: "Biojoias e sementes",
  },
  {
    src: fotoAldeasColetivo,
    alt: "Grupo de mulheres potiguara em espaco cultural",
    legenda: "Artesãs em espaço cultural",
  },
  {
    src: fotoArtesasRetrato,
    alt: "Tres mulheres usando adornos potiguara",
    legenda: "Artesas potiguara",
  },
  {
    src: fotoAssociacaoPotiguara,
    alt: "Representantes em frente a grafismo e cocar potiguara",
    legenda: "Organização coletiva",
  },
  {
    src: fotoPotiguara,
    alt: "Artesa potiguara ao lado de uma mesa com colares artesanais",
    legenda: "Artesanato ancestral",
  },
];

const Artesas = () => {
  const [fotoAtual, setFotoAtual] = useState(0);
  const fotoSelecionada = fotosArtesas[fotoAtual];

  useEffect(() => {
    const intervalo = window.setInterval(() => {
      setFotoAtual((atual) => (atual === fotosArtesas.length - 1 ? 0 : atual + 1));
    }, 4000);

    return () => window.clearInterval(intervalo);
  }, []);

  const voltarFoto = () => {
    setFotoAtual((atual) => (atual === 0 ? fotosArtesas.length - 1 : atual - 1));
  };

  const avancarFoto = () => {
    setFotoAtual((atual) => (atual === fotosArtesas.length - 1 ? 0 : atual + 1));
  };

  return (
    <Box bg={CORES.BRANCO}>
      <Box as="section" position="relative" bg={CORES.PRETO} overflow="hidden">
        <HoneycombBackgroundRed />
        <Container maxW="container.lg" position="relative" zIndex={1} px={{ base: 5, md: 8 }} py={{ base: 10, md: 20 }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 9, md: 10 }} alignItems="center">
            <Stack gap={5} align="flex-start">
              <Flex
                display="inline-flex"
                align="center"
                gap={2}
                bg={CORES.BRANCO}
                border={`2px solid ${CORES.PRETO}`}
                borderRadius={`${RADIUS_PADRAO_BOTAO}px`}
                maxW="100%"
                px={{ base: 3, md: 4 }}
                py={2}
                transform="rotate(-3deg)"
              >
                <Box as="span" w="8px" h="8px" borderRadius="full" bg={CORES.VERMELHO_VIVO} />
                <Text as="span" fontStyle="italic" color={CORES.PRETO} fontSize={{ base: "13px", md: `${TAMANHO.TEXTO_PEQUENO}px` }}>
                  Mulheres que mantem o saber vivo
                </Text>
              </Flex>

              <Heading
                as="h1"
                fontFamily="'Hashira', serif"
                fontWeight="normal"
                lineHeight={1}
                color={CORES.BRANCO}
                fontSize={{ base: "44px", sm: "52px", md: `${TAMANHO.TITULO_YBIRA}px` }}
                maxW="100%"
                wordBreak="break-word"
              >
                Artesas Potiguara
              </Heading>

              <Text color={CORES.CINZA_CLARO} fontSize={{ base: "18px", md: `${TAMANHO.SUBTITULO_SECAO}px` }} lineHeight={1.35}>
                Das aldeias de Baia da Traicao, Marcacao e Rio Tinto, as artesas produzem renda, memoria e
                pertencimento com sementes, cipos, fibras, conchas e grafismos.
              </Text>
            </Stack>

            <Box w="100%">
              <Box
                position="relative"
                mx="auto"
                w="100%"
                maxW={{ base: "340px", sm: "420px", md: "500px" }}
                aspectRatio="1 / 1"
                borderRadius="4px"
                overflow="hidden"
                bg={CORES.PRETO}
                boxShadow={{ base: `7px 7px 0 ${CORES.VERMELHO_ESCURO}`, md: `12px 12px 0 ${CORES.VERMELHO_ESCURO}` }}
              >
                <Image
                  src={fotoSelecionada.src}
                  alt={fotoSelecionada.alt}
                  w="100%"
                  h="100%"
                  objectFit="contain"
                  objectPosition="center"
                />

                <Flex
                  position="absolute"
                  insetX={0}
                  bottom={0}
                  align="center"
                  justify="space-between"
                  gap={4}
                  px={{ base: 3, md: 5 }}
                  py={{ base: 2, md: 3 }}
                  bg="rgba(43, 33, 33, 0.78)"
                >
                  <Text color={CORES.BRANCO} fontWeight="800" fontSize={{ base: "14px", md: `${TAMANHO.CORPO_TEXTO}px` }} lineHeight={1.15}>
                    {fotoSelecionada.legenda}
                  </Text>
                  <Text color={CORES.CINZA_CLARO} fontSize={{ base: "12px", md: `${TAMANHO.TEXTO_PEQUENO}px` }} flexShrink={0}>
                    {fotoAtual + 1}/{fotosArtesas.length}
                  </Text>
                </Flex>
              </Box>

              <Flex mt={{ base: 4, md: 5 }} align="center" justify="center" gap={{ base: 3, md: 4 }}>
                <Flex
                  as="button"
                  aria-label="Foto anterior"
                  onClick={voltarFoto}
                  w={{ base: "36px", md: "40px" }}
                  h={{ base: "36px", md: "40px" }}
                  align="center"
                  justify="center"
                  bg={CORES.BRANCO}
                  color={CORES.VERMELHO_ESCURO}
                  borderRadius="4px"
                  _hover={{ bg: CORES.VERMELHO_CLARINHO }}
                >
                  <ChevronLeft size={22} />
                </Flex>

                <Flex gap={2} align="center">
                  {fotosArtesas.map((foto, index) => (
                    <Box
                      as="button"
                      aria-label={`Ver foto: ${foto.legenda}`}
                      key={foto.legenda}
                      onClick={() => setFotoAtual(index)}
                      w={{ base: index === fotoAtual ? "22px" : "10px", md: index === fotoAtual ? "28px" : "10px" }}
                      h="10px"
                      borderRadius="full"
                      bg={index === fotoAtual ? CORES.VERMELHO_VIVO : CORES.CINZA_CLARO}
                      transition="width 0.2s ease, background 0.2s ease"
                    />
                  ))}
                </Flex>

                <Flex
                  as="button"
                  aria-label="Proxima foto"
                  onClick={avancarFoto}
                  w={{ base: "36px", md: "40px" }}
                  h={{ base: "36px", md: "40px" }}
                  align="center"
                  justify="center"
                  bg={CORES.BRANCO}
                  color={CORES.VERMELHO_ESCURO}
                  borderRadius="4px"
                  _hover={{ bg: CORES.VERMELHO_CLARINHO }}
                >
                  <ChevronRight size={22} />
                </Flex>
              </Flex>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      <Box as="section" py={{ base: 8, md: 14 }}>
        <Container maxW="container.lg" px={{ base: 5, md: 8 }}>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={5}>
            <Box bg={CORES.VERMELHO_ESCURO} color={CORES.BRANCO} borderRadius="4px" p={{ base: 5, md: 6 }}>
              <UsersRound size={28} strokeWidth={1.75} />
              <Text mt={4} fontWeight="800" fontSize={{ base: "18px", md: `${TAMANHO.SUBTITULO_SECAO}px` }}>
                17 aldeias mapeadas
              </Text>
              <Text mt={2} color={CORES.CINZA_CLARO} fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}>
                O diagnostico citado no PDF aponta artesas distribuidas por diferentes aldeias do territorio.
              </Text>
            </Box>
            <Box bg={CORES.PRETO} color={CORES.BRANCO} borderRadius="4px" p={{ base: 5, md: 6 }}>
              <Sprout size={28} strokeWidth={1.75} />
              <Text mt={4} fontWeight="800" fontSize={{ base: "18px", md: `${TAMANHO.SUBTITULO_SECAO}px` }}>
                Saber tradicional
              </Text>
              <Text mt={2} color={CORES.CINZA_CLARO} fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}>
                A producao preserva tecnicas familiares, modos de coleta e relacoes com a mata e o mar.
              </Text>
            </Box>
            <Box bg={CORES.MARROM} color={CORES.BRANCO} borderRadius="4px" p={{ base: 5, md: 6 }}>
              <Gem size={28} strokeWidth={1.75} />
              <Text mt={4} fontWeight="800" fontSize={{ base: "18px", md: `${TAMANHO.SUBTITULO_SECAO}px` }}>
                Renda mais justa
              </Text>
              <Text mt={2} color={CORES.CINZA_CLARO} fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}>
                A pagina valoriza as produtoras e ajuda a reduzir invisibilidade e dependencia de atravessadores.
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      <Box as="section" bg={CORES.CINZA_CLARINHO} py={{ base: 8, md: 14 }}>
        <Container maxW="container.lg" px={{ base: 5, md: 8 }}>
          <Stack gap={3} mb={{ base: 6, md: 8 }}>
            <Heading as="h2" color={CORES.PRETO} fontSize={{ base: "22px", md: `${TAMANHO.TITULO_SECAO}px` }}>
              Historias das artesas
            </Heading>
            <Text color={CORES.CINZA_ESCURO} maxW="68ch" fontSize={`${TAMANHO.CORPO_TEXTO}px`}>
              Esta primeira versao apresenta cinco perfis representativos para facilitar a implementacao enquanto
              os nomes, fotos individuais e redes sociais reais sao cadastrados pela fundacao.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5}>
            {artesas.map((artesa, index) => (
              <Box key={artesa.nome} bg={CORES.BRANCO} borderRadius="4px" overflow="hidden">
                <Box position="relative" h={{ base: "190px", md: "220px" }} bg={CORES.PRETO}>
                  <Image
                    src={fotoPotiguara}
                    alt={artesa.nome}
                    objectFit="cover"
                    objectPosition={index % 2 === 0 ? "center" : "left center"}
                    w="100%"
                    h="100%"
                    opacity={0.9}
                  />
                  <Flex
                    position="absolute"
                    left={4}
                    bottom={4}
                    align="center"
                    gap={2}
                    bg={CORES.PRETO}
                    color={CORES.BRANCO}
                    borderRadius="4px"
                    px={3}
                    py={2}
                  >
                    <MapPin size={16} />
                    <Text fontSize={`${TAMANHO.TEXTO_PEQUENO}px`} fontWeight="700">
                      {artesa.aldeia}
                    </Text>
                  </Flex>
                </Box>

                <Stack gap={3} p={{ base: 4, md: 5 }}>
                  <Heading as="h3" color={CORES.PRETO} fontSize={{ base: "18px", md: `${TAMANHO.SUBTITULO_SECAO}px` }}>
                    {artesa.nome}
                  </Heading>
                  <Text color={CORES.CINZA_ESCURO} fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}>
                    {artesa.historia}
                  </Text>
                  <Text color={CORES.PRETO} fontWeight="800" fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}>
                    Produz: {artesa.producao}.
                  </Text>
                  <Flex gap={2} wrap="wrap">
                    {artesa.materiais.map((material) => (
                      <Badge key={material} bg={CORES.VERMELHO_CLARINHO} color={CORES.VERMELHO_ESCURO}>
                        {material}
                      </Badge>
                    ))}
                  </Flex>
                  <Flex align="center" gap={2} color={CORES.CINZA_ESCURO}>
                    <Globe size={16} />
                    <Text fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}>Redes sociais a confirmar</Text>
                  </Flex>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};

export default Artesas;
