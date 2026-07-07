import HoneycombBackgroundRed from "@/components/general/HoneycombBackgroundRed";
import HoneycombBackgroundBlack from "@/components/general/HoneycombBackgroundBlack";
import PerfilArtesa, { type RedeSocialArtesa } from "@/components/artesas/PerfilArtesasInfo";
import fotoPotiguara from "@/assets/artesa-potiguara.jpeg";
import fotoTalitaBrito from "@/assets/artesa-talita-brito.jpeg";
import fotoIvanildaRocha from "@/assets/artesa-ivanilda-rocha.jpeg";
import fotoArtesanatoMesa from "@/assets/cultura-artesanato-mesa.jpeg";
import fotoAldeasColetivo from "@/assets/cultura-aldeas-coletivo.jpeg";
import fotoArtesasRetrato from "@/assets/cultura-artesas-retrato.jpeg";
import fotoAssociacaoPotiguara from "@/assets/cultura-associacao-potiguara.jpeg";
import { CORES, RADIUS_PADRAO_BOTAO, TAMANHO } from "@/util/constants";
import { Box, Container, Flex, Heading, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, Gem, Sprout, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";

interface ArtesaResumo {
  nome: string;
  aldeia: string;
  producao: string;
  historia: string;
  materiais: string[];
  foto?: string;
  posicaoFoto?: string;
  zoomFoto?: number;
  redesSociais: RedeSocialArtesa[];
}

const artesas: ArtesaResumo[] = [
  {
    nome: "Talita Brito",
    aldeia: "Baía da Traição",
    producao: "joias com miçangas de vidro",
    historia:
      "Vive na zona urbana de Baía da Traição e produz joias com miçangas de vidro, criando peças delicadas e coloridas.",
    materiais: ["miçangas de vidro", "joias", "fios"],
    foto: fotoTalitaBrito,
    posicaoFoto: "center 32%",
    zoomFoto: 1.35,
    redesSociais: [
      {
        tipo: "instagram",
        url: "https://www.instagram.com/tara_arteindigena?igsh=MTJ6MDY2OXpxM24xNw==",
      },
      {
        tipo: "email",
        url: "mailto:talitabrito@gmail.com",
      },
      {
        tipo: "whatsapp",
        url: "https://wa.me/5583999910101",
      },
    ],
  },
  {
    nome: "Creuza Gomes",
    aldeia: "Forte",
    producao: "biojoias, brincos com plumagens, filtro dos sonhos e abajur",
    historia:
      "Produz peças que unem sementes, plumagens e técnicas artesanais, valorizando a criatividade e os saberes da Aldeia Forte.",
    materiais: ["sementes", "plumagens", "fibras"],
    redesSociais: [
      {
        tipo: "instagram",
        url: "https://www.instagram.com/creuzapotiguara?igsh=MWE3Mm9uZHg2d2F1Mw==",
      },
      {
        tipo: "email",
        url: "mailto:creuzagomes@gmail.com",
      },
      {
        tipo: "whatsapp",
        url: "https://wa.me/5583999920202",
      },
    ],
  },
  {
    nome: "Ivanilda Rocha",
    aldeia: "Aldeia Alto do Tambá",
    producao: "biojoias, joias com miçangas e costura criativa",
    historia:
      "Na Aldeia Alto do Tambá, cria biojoias, joias com miçangas e peças de costura criativa ligadas ao fazer potiguara.",
    materiais: ["biojoias", "miçangas", "costura criativa"],
    foto: fotoIvanildaRocha,
    posicaoFoto: "center 42%",
    zoomFoto: 1.25,
    redesSociais: [
      {
        tipo: "instagram",
        url: "https://www.instagram.com/ivanildaartesapotiguara?igsh=MXd5czJld3ptZXQzdw==",
      },
      {
        tipo: "email",
        url: "mailto:ivanildarocha@gmail.com",
      },
      {
        tipo: "whatsapp",
        url: "https://wa.me/5583999930303",
      },
    ],
  },
];

const fotosArtesas = [
  {
    src: fotoArtesanatoMesa,
    alt: "Mesa com colares e biojoias potiguara feitos com sementes",
    legenda: "Biojoias E Sementes",
  },
  {
    src: fotoAldeasColetivo,
    alt: "Grupo de mulheres potiguara em espaço cultural",
    legenda: "Artesãs Em Espaço Cultural",
  },
  {
    src: fotoArtesasRetrato,
    alt: "Três mulheres usando adornos potiguara",
    legenda: "Artesãs Potiguara",
  },
  {
    src: fotoAssociacaoPotiguara,
    alt: "Representantes em frente a grafismo e cocar potiguara",
    legenda: "Organização Coletiva",
  },
  {
    src: fotoPotiguara,
    alt: "Artesã potiguara ao lado de uma mesa com colares artesanais",
    legenda: "Artesanato Ancestral",
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
                  Mulheres que mantêm o saber vivo
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
                Artesãs Potiguara
              </Heading>

              <Text color={CORES.CINZA_CLARO} fontSize={{ base: "18px", md: `${TAMANHO.SUBTITULO_SECAO}px` }} lineHeight={1.35}>
                Das aldeias de Baía da Traição, Marcação e Rio Tinto, as artesãs produzem renda, memória e
                pertencimento com sementes, cipós, fibras, conchas e grafismos.
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
                bg="transparent"
                boxShadow={{ base: `7px 7px 0 ${CORES.VERMELHO_ESCURO}`, md: `12px 12px 0 ${CORES.VERMELHO_ESCURO}` }}
              >
                <Image
                  src={fotoSelecionada.src}
                  alt={fotoSelecionada.alt}
                  w="100%"
                  h="100%"
                  objectFit="cover"
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
                  aria-label="Próxima foto"
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
                17 Aldeias Mapeadas
              </Text>
              <Text mt={2} color={CORES.CINZA_CLARO} fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}>
                O diagnóstico citado no PDF aponta artesãs distribuídas por diferentes aldeias do território.
              </Text>
            </Box>
            <Box bg={CORES.PRETO} color={CORES.BRANCO} borderRadius="4px" p={{ base: 5, md: 6 }}>
              <Sprout size={28} strokeWidth={1.75} />
              <Text mt={4} fontWeight="800" fontSize={{ base: "18px", md: `${TAMANHO.SUBTITULO_SECAO}px` }}>
                Saber Tradicional
              </Text>
              <Text mt={2} color={CORES.CINZA_CLARO} fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}>
                A produção preserva técnicas familiares, modos de coleta e relações com a mata e o mar.
              </Text>
            </Box>
            <Box bg={CORES.MARROM} color={CORES.BRANCO} borderRadius="4px" p={{ base: 5, md: 6 }}>
              <Gem size={28} strokeWidth={1.75} />
              <Text mt={4} fontWeight="800" fontSize={{ base: "18px", md: `${TAMANHO.SUBTITULO_SECAO}px` }}>
                Renda Mais Justa
              </Text>
              <Text mt={2} color={CORES.CINZA_CLARO} fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}>
                A página valoriza as produtoras e ajuda a reduzir invisibilidade e dependência de atravessadores.
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      <Box as="section" position="relative" overflow="hidden" py={{ base: 8, md: 14 }}>
        <HoneycombBackgroundBlack />
        <Container maxW="container.lg" position="relative" zIndex={1} px={{ base: 5, md: 8 }}>
          <Stack gap={3} mb={{ base: 8, md: 12 }}>
            <Heading as="h2" color={CORES.BRANCO} fontSize={{ base: "22px", md: `${TAMANHO.TITULO_SECAO}px` }}>
              Histórias das Artesãs
            </Heading>
          </Stack>

          <Box>
            {artesas.map((artesa, index) => (
              <PerfilArtesa
                key={artesa.nome}
                nome={artesa.nome}
                aldeia={artesa.aldeia}
                historia={artesa.historia}
                producao={artesa.producao}
                materiais={artesa.materiais}
                foto={artesa.foto ?? fotoPotiguara}
                ajustarFoto={Boolean(artesa.foto)}
                posicaoFoto={artesa.posicaoFoto}
                zoomFoto={artesa.zoomFoto}
                redesSociais={artesa.redesSociais}
                inverterLado={index % 2 === 1}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Artesas;
