import HoneycombBackgroundRed from "@/components/general/HoneycombBackgroundRed";
import fotoPotiguara from "@/assets/artesa-potiguara.jpeg";
import { CORES, RADIUS_PADRAO_BOTAO, TAMANHO } from "@/util/constants";
import { Badge, Box, Container, Flex, Heading, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Gem, Globe, MapPin, Sprout, UsersRound } from "lucide-react";

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

const Artesas = () => {

  return (
    <Box bg={CORES.BRANCO}>
      <Box as="section" position="relative" bg={CORES.PRETO} overflow="hidden">
        <HoneycombBackgroundRed />
        <Container maxW="container.lg" position="relative" zIndex={1} py={{ base: 14, md: 20 }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 10 }} alignItems="center">
            <Stack gap={5} align="flex-start">
              <Flex
                display="inline-flex"
                align="center"
                gap={2}
                bg={CORES.BRANCO}
                border={`2px solid ${CORES.PRETO}`}
                borderRadius={`${RADIUS_PADRAO_BOTAO}px`}
                px={4}
                py={2}
                transform="rotate(-3deg)"
              >
                <Box as="span" w="8px" h="8px" borderRadius="full" bg={CORES.VERMELHO_VIVO} />
                <Text as="span" fontStyle="italic" color={CORES.PRETO} fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}>
                  Mulheres que mantem o saber vivo
                </Text>
              </Flex>

              <Heading
                as="h1"
                fontFamily="'Hashira', serif"
                fontWeight="normal"
                lineHeight={1}
                color={CORES.BRANCO}
                fontSize={{ base: "52px", md: `${TAMANHO.TITULO_YBIRA}px` }}
              >
                Artesas Potiguara
              </Heading>

              <Text color={CORES.CINZA_CLARO} fontSize={`${TAMANHO.SUBTITULO_SECAO}px`} lineHeight={1.35}>
                Das aldeias de Baia da Traicao, Marcacao e Rio Tinto, as artesas produzem renda, memoria e
                pertencimento com sementes, cipos, fibras, conchas e grafismos.
              </Text>
            </Stack>

            <Image
              src={fotoPotiguara}
              alt="Artesa potiguara com colares artesanais"
              borderRadius="4px"
              objectFit="cover"
              w="100%"
              h={{ base: "260px", md: "380px" }}
              boxShadow="8px 8px 0px rgba(210, 23, 23, 0.45)"
            />
          </SimpleGrid>
        </Container>
      </Box>

      <Box as="section" py={{ base: 10, md: 14 }}>
        <Container maxW="container.lg">
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={5}>
            <Box bg={CORES.VERMELHO_ESCURO} color={CORES.BRANCO} borderRadius="4px" p={6}>
              <UsersRound size={28} strokeWidth={1.75} />
              <Text mt={4} fontWeight="800" fontSize={`${TAMANHO.SUBTITULO_SECAO}px`}>
                17 aldeias mapeadas
              </Text>
              <Text mt={2} color={CORES.CINZA_CLARO} fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}>
                O diagnostico citado no PDF aponta artesas distribuidas por diferentes aldeias do territorio.
              </Text>
            </Box>
            <Box bg={CORES.PRETO} color={CORES.BRANCO} borderRadius="4px" p={6}>
              <Sprout size={28} strokeWidth={1.75} />
              <Text mt={4} fontWeight="800" fontSize={`${TAMANHO.SUBTITULO_SECAO}px`}>
                Saber tradicional
              </Text>
              <Text mt={2} color={CORES.CINZA_CLARO} fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}>
                A producao preserva tecnicas familiares, modos de coleta e relacoes com a mata e o mar.
              </Text>
            </Box>
            <Box bg={CORES.MARROM} color={CORES.BRANCO} borderRadius="4px" p={6}>
              <Gem size={28} strokeWidth={1.75} />
              <Text mt={4} fontWeight="800" fontSize={`${TAMANHO.SUBTITULO_SECAO}px`}>
                Renda mais justa
              </Text>
              <Text mt={2} color={CORES.CINZA_CLARO} fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}>
                A pagina valoriza as produtoras e ajuda a reduzir invisibilidade e dependencia de atravessadores.
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      <Box as="section" bg={CORES.CINZA_CLARINHO} py={{ base: 10, md: 14 }}>
        <Container maxW="container.lg">
          <Stack gap={3} mb={8}>
            <Heading as="h2" color={CORES.PRETO} fontSize={`${TAMANHO.TITULO_SECAO}px`}>
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
                <Box position="relative" h="220px" bg={CORES.PRETO}>
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

                <Stack gap={3} p={5}>
                  <Heading as="h3" color={CORES.PRETO} fontSize={`${TAMANHO.SUBTITULO_SECAO}px`}>
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
