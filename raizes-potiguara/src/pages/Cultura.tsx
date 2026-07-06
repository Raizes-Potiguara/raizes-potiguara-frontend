import HoneycombBackgroundRed from "@/components/general/HoneycombBackgroundRed";
import fotoPotiguara from "@/assets/artesa-potiguara.jpeg";
import fotoArtesanatoMesa from "@/assets/cultura-artesanato-mesa.jpeg";
import fotoAldeasColetivo from "@/assets/cultura-aldeas-coletivo.jpeg";
import fotoArtesasRetrato from "@/assets/cultura-artesas-retrato.jpeg";
import fotoAssociacaoPotiguara from "@/assets/cultura-associacao-potiguara.jpeg";
import { CORES, RADIUS_PADRAO_BOTAO, TAMANHO } from "@/util/constants";
import { Box, Container, Flex, Heading, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, Feather, Gem, Leaf, Languages, Shell, ShieldCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface BlocoCultural {
  titulo: string;
  descricao: string;
  icon: LucideIcon;
}

const simbolos: BlocoCultural[] = [
  {
    titulo: "Grafismos",
    descricao:
      "Linhas, tramas e marcas visuais ajudam a contar pertencimento, memoria e relacao com o territorio.",
    icon: Sparkles,
  },
  {
    titulo: "Conchas e mar",
    descricao:
      "A presenca do litoral aparece como caminho, alimento e lembranca da vida entre rios, mangues e praias.",
    icon: Shell,
  },
  {
    titulo: "Protecao",
    descricao:
      "Adornos e amuletos podem carregar sentidos de cuidado, espiritualidade e fortalecimento coletivo.",
    icon: ShieldCheck,
  },
];

const materiais: BlocoCultural[] = [
  {
    titulo: "Sementes",
    descricao:
      "Usadas em biojoias, aproximam a peca dos ciclos da mata, da coleta e do cuidado com a natureza.",
    icon: Gem,
  },
  {
    titulo: "Cipos e fibras",
    descricao:
      "Aparecem na cestaria e nos trancados, mostrando paciencia, tecnica e saber passado entre geracoes.",
    icon: Leaf,
  },
  {
    titulo: "Penas e pigmentos",
    descricao:
      "Quando presentes, conectam cor, rito e identidade, sempre respeitando o sentido cultural de cada uso.",
    icon: Feather,
  },
];

const topicos = [
  "Comercializacao justa para reduzir a dependencia de atravessadores.",
  "Certificacao do artesanato indigena como reconhecimento de origem.",
  "Autonomia economica das mulheres potiguara e fortalecimento das familias.",
  "Organizacao coletiva entre aldeias para preservar renda, memoria e tecnica.",
];

const fotosCultura = [
  {
    src: fotoArtesanatoMesa,
    alt: "Mesa com colares e biojoias potiguara feitos com sementes",
    legenda: "Biojoias e sementes",
  },
  {
    src: fotoAldeasColetivo,
    alt: "Grupo de mulheres potiguara em espaco cultural",
    legenda: "Mulheres e aldeias",
  },
  {
    src: fotoArtesasRetrato,
    alt: "Tres mulheres usando adornos potiguara",
    legenda: "Artesas potiguara",
  },
  {
    src: fotoAssociacaoPotiguara,
    alt: "Representantes em frente a grafismo e cocar potiguara",
    legenda: "Organizacao coletiva",
  },
  {
    src: fotoPotiguara,
    alt: "Artesa potiguara ao lado de uma mesa com colares artesanais",
    legenda: "Artesanato ancestral",
  },
];

const Cultura = () => {
  const [fotoAtual, setFotoAtual] = useState(0);
  const fotoSelecionada = fotosCultura[fotoAtual];

  useEffect(() => {
    const intervalo = window.setInterval(() => {
      setFotoAtual((atual) => (atual === fotosCultura.length - 1 ? 0 : atual + 1));
    }, 4000);

    return () => window.clearInterval(intervalo);
  }, []);

  const voltarFoto = () => {
    setFotoAtual((atual) => (atual === 0 ? fotosCultura.length - 1 : atual - 1));
  };

  const avancarFoto = () => {
    setFotoAtual((atual) => (atual === fotosCultura.length - 1 ? 0 : atual + 1));
  };

  return (
    <Box bg={CORES.BRANCO}>
      <Box as="section" position="relative" bg={CORES.PRETO} overflow="hidden">
        <HoneycombBackgroundRed />
        <Container maxW="container.lg" position="relative" zIndex={1} py={{ base: 14, md: 20 }}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 10, lg: 12 }} alignItems="center">
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
                  Memoria, territorio e artesanato
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
                Cultura Potiguara
              </Heading>

              <Text color={CORES.CINZA_CLARO} fontSize={`${TAMANHO.SUBTITULO_SECAO}px`} lineHeight={1.35}>
                O artesanato potiguara guarda simbolos, materiais e palavras que nascem da relacao com as aldeias,
                com o litoral norte da Paraiba e com os saberes transmitidos pelas mulheres.
              </Text>
            </Stack>

            <Box>
              <Box
                position="relative"
                mx={{ base: "auto", lg: 0 }}
                maxW={{ base: "520px", lg: "500px" }}
                aspectRatio="1 / 1"
                borderRadius="4px"
                overflow="hidden"
                bg={CORES.PRETO}
                boxShadow={`12px 12px 0 ${CORES.VERMELHO_ESCURO}`}
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
                  px={{ base: 4, md: 5 }}
                  py={3}
                  bg="rgba(43, 33, 33, 0.78)"
                >
                  <Text color={CORES.BRANCO} fontWeight="800" fontSize={`${TAMANHO.CORPO_TEXTO}px`}>
                    {fotoSelecionada.legenda}
                  </Text>
                  <Text color={CORES.CINZA_CLARO} fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}>
                    {fotoAtual + 1}/{fotosCultura.length}
                  </Text>
                </Flex>
              </Box>

              <Flex mt={5} align="center" justify="center" gap={4}>
                <Flex
                  as="button"
                  type="button"
                  aria-label="Foto anterior"
                  onClick={voltarFoto}
                  w="40px"
                  h="40px"
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
                  {fotosCultura.map((foto, index) => (
                    <Box
                      as="button"
                      type="button"
                      aria-label={`Ver foto: ${foto.legenda}`}
                      key={foto.legenda}
                      onClick={() => setFotoAtual(index)}
                      w={index === fotoAtual ? "28px" : "10px"}
                      h="10px"
                      borderRadius="full"
                      bg={index === fotoAtual ? CORES.VERMELHO_VIVO : CORES.CINZA_CLARO}
                      transition="width 0.2s ease, background 0.2s ease"
                    />
                  ))}
                </Flex>

                <Flex
                  as="button"
                  type="button"
                  aria-label="Proxima foto"
                  onClick={avancarFoto}
                  w="40px"
                  h="40px"
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

      <Box as="section" py={{ base: 10, md: 14 }}>
        <Container maxW="container.lg">
          <Stack gap={3} mb={8}>
            <Heading as="h2" color={CORES.PRETO} fontSize={`${TAMANHO.TITULO_SECAO}px`}>
              Simbolos e crencas
            </Heading>
            <Text color={CORES.CINZA_ESCURO} maxW="66ch" fontSize={`${TAMANHO.CORPO_TEXTO}px`}>
              Cada peca pode carregar um sentido que vai alem do uso decorativo: proteger, lembrar a origem,
              marcar a presenca do povo Potiguara e aproximar quem compra da historia de quem cria.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={5}>
            {simbolos.map(({ titulo, descricao, icon: Icon }) => (
              <Box key={titulo} bg={CORES.VERMELHO_ESCURO} color={CORES.BRANCO} borderRadius="4px" p={6}>
                <Icon size={28} strokeWidth={1.75} />
                <Text mt={4} fontWeight="800" fontSize={`${TAMANHO.SUBTITULO_SECAO}px`}>
                  {titulo}
                </Text>
                <Text mt={2} color={CORES.CINZA_CLARO} fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}>
                  {descricao}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Box as="section" bg={CORES.CINZA_CLARINHO} py={{ base: 10, md: 14 }}>
        <Container maxW="container.lg">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 10 }} alignItems="start">
            <Stack gap={4}>
              <Heading as="h2" color={CORES.PRETO} fontSize={`${TAMANHO.TITULO_SECAO}px`}>
                Materiais e significados
              </Heading>
              <Text color={CORES.CINZA_ESCURO} fontSize={`${TAMANHO.CORPO_TEXTO}px`}>
                Sementes, cipos, fibras e pigmentos nao sao apenas insumos. Eles revelam deslocamentos, coleta,
                memoria ambiental e a dificuldade de produzir quando o territorio e a materia-prima ficam distantes.
              </Text>
            </Stack>

            <Stack gap={4}>
              {materiais.map(({ titulo, descricao, icon: Icon }) => (
                <Flex key={titulo} gap={4} bg={CORES.BRANCO} borderRadius="4px" p={5} align="flex-start">
                  <Flex
                    w="42px"
                    h="42px"
                    align="center"
                    justify="center"
                    bg={CORES.VERMELHO_CLARINHO}
                    color={CORES.VERMELHO_ESCURO}
                    borderRadius="4px"
                    flexShrink={0}
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </Flex>
                  <Box>
                    <Text color={CORES.PRETO} fontWeight="800" fontSize={`${TAMANHO.CORPO_TEXTO}px`}>
                      {titulo}
                    </Text>
                    <Text mt={1} color={CORES.CINZA_ESCURO} fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}>
                      {descricao}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>

      <Box as="section" bg={CORES.PRETO} py={{ base: 10, md: 14 }}>
        <Container maxW="container.lg">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 10 }}>
            <Stack gap={4}>
              <Flex color={CORES.VERMELHO_CLARINHO} align="center" gap={3}>
                <Languages size={28} />
                <Heading as="h2" color={CORES.BRANCO} fontSize={`${TAMANHO.TITULO_SECAO}px`}>
                  O tupi potiguara
                </Heading>
              </Flex>
              <Text color={CORES.CINZA_CLARO} fontSize={`${TAMANHO.CORPO_TEXTO}px`}>
                A lingua e parte da retomada cultural. No produto artesanal, palavras em tupi potiguara podem
                aproximar nome, origem e significado, ajudando o cliente a conhecer a peca sem apagar sua raiz.
              </Text>
            </Stack>

            <Stack gap={3}>
              {topicos.map((topico) => (
                <Flex key={topico} gap={3} align="flex-start" color={CORES.BRANCO}>
                  <Box as="span" mt="8px" w="8px" h="8px" borderRadius="full" bg={CORES.VERMELHO_VIVO} flexShrink={0} />
                  <Text fontSize={`${TAMANHO.CORPO_TEXTO}px`}>{topico}</Text>
                </Flex>
              ))}
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};

export default Cultura;
