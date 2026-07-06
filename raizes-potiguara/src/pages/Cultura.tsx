import HoneycombBackgroundRed from "@/components/general/HoneycombBackgroundRed";
import { CORES, RADIUS_PADRAO_BOTAO, TAMANHO } from "@/util/constants";
import { Box, Container, Flex, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Feather, Gem, Leaf, Languages, Shell, ShieldCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface BlocoCultural {
  titulo: string;
  descricao: string;
  icon: LucideIcon;
}

const simbolos: BlocoCultural[] = [
  {
    titulo: "Grafismos",
    descricao:
      "Linhas, tramas e marcas visuais ajudam a contar pertencimento, memória e relação com o território.",
    icon: Sparkles,
  },
  {
    titulo: "Conchas e mar",
    descricao:
      "A presença do litoral aparece como caminho, alimento e lembrança da vida entre rios, mangues e praias.",
    icon: Shell,
  },
  {
    titulo: "Proteção",
    descricao:
      "Adornos e amuletos podem carregar sentidos de cuidado, espiritualidade e fortalecimento coletivo.",
    icon: ShieldCheck,
  },
];

const materiais: BlocoCultural[] = [
  {
    titulo: "Sementes",
    descricao:
      "Usadas em biojoias, aproximam a peça dos ciclos da mata, da coleta e do cuidado com a natureza.",
    icon: Gem,
  },
  {
    titulo: "Cipós e fibras",
    descricao:
      "Aparecem na cestaria e nos trancados, mostrando paciência, técnica e saber passado entre gerações.",
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
  "Comercialização justa para reduzir a dependência de atravessadores.",
  "Certificação do artesanato indígena como reconhecimento de origem.",
  "Autonomia econômica das mulheres potiguara e fortalecimento das famílias.",
  "Organização coletiva entre aldeias para preservar renda, memória e técnica.",
];

const Cultura = () => {
  return (
    <Box bg={CORES.BRANCO}>
      <Box as="section" position="relative" bg={CORES.PRETO} overflow="hidden">
        <HoneycombBackgroundRed />
        <Container maxW="container.lg" position="relative" zIndex={1} px={{ base: 5, md: 8 }} py={{ base: 10, md: 20 }}>
          <Stack gap={5} align="flex-start" maxW="720px">
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
                Memória, território e artesanato
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
              Cultura Potiguara
            </Heading>

            <Text color={CORES.CINZA_CLARO} fontSize={{ base: "18px", md: `${TAMANHO.SUBTITULO_SECAO}px` }} lineHeight={1.35}>
              O artesanato potiguara guarda símbolos, materiais e palavras que nascem da relação com as aldeias,
              com o litoral norte da Paraíba e com os saberes transmitidos pelas mulheres.
            </Text>
          </Stack>
        </Container>
      </Box>

      <Box as="section" py={{ base: 8, md: 14 }}>
        <Container maxW="container.lg" px={{ base: 5, md: 8 }}>
          <Stack gap={3} mb={{ base: 6, md: 8 }}>
            <Heading as="h2" color={CORES.PRETO} fontSize={{ base: "22px", md: `${TAMANHO.TITULO_SECAO}px` }}>
              Símbolos e crenças
            </Heading>
            <Text color={CORES.CINZA_ESCURO} maxW="66ch" fontSize={`${TAMANHO.CORPO_TEXTO}px`}>
              Cada peça pode carregar um sentido que vai além do uso decorativo: proteger, lembrar a origem,
              marcar a presença do povo Potiguara e aproximar quem compra da história de quem cria.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={5}>
            {simbolos.map(({ titulo, descricao, icon: Icon }) => (
              <Box key={titulo} bg={CORES.VERMELHO_ESCURO} color={CORES.BRANCO} borderRadius="4px" p={{ base: 5, md: 6 }}>
                <Icon size={28} strokeWidth={1.75} />
                <Text mt={4} fontWeight="800" fontSize={{ base: "18px", md: `${TAMANHO.SUBTITULO_SECAO}px` }}>
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

      <Box as="section" bg={CORES.CINZA_CLARINHO} py={{ base: 8, md: 14 }}>
        <Container maxW="container.lg" px={{ base: 5, md: 8 }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 10 }} alignItems="start">
            <Stack gap={4}>
              <Heading as="h2" color={CORES.PRETO} fontSize={{ base: "22px", md: `${TAMANHO.TITULO_SECAO}px` }}>
                Materiais e significados
              </Heading>
              <Text color={CORES.CINZA_ESCURO} fontSize={`${TAMANHO.CORPO_TEXTO}px`}>
                Sementes, cipós, fibras e pigmentos não são apenas insumos. Eles revelam deslocamentos, coleta,
                memória ambiental e a dificuldade de produzir quando o território e a matéria-prima ficam distantes.
              </Text>
            </Stack>

            <Stack gap={4}>
              {materiais.map(({ titulo, descricao, icon: Icon }) => (
                <Flex key={titulo} gap={{ base: 3, md: 4 }} bg={CORES.BRANCO} borderRadius="4px" p={{ base: 4, md: 5 }} align="flex-start">
                  <Flex
                    w={{ base: "38px", md: "42px" }}
                    h={{ base: "38px", md: "42px" }}
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

      <Box as="section" bg={CORES.PRETO} py={{ base: 8, md: 14 }}>
        <Container maxW="container.lg" px={{ base: 5, md: 8 }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 10 }}>
            <Stack gap={4}>
              <Flex color={CORES.VERMELHO_CLARINHO} align="center" gap={3}>
                <Languages size={28} />
                <Heading as="h2" color={CORES.BRANCO} fontSize={{ base: "22px", md: `${TAMANHO.TITULO_SECAO}px` }}>
                  O tupi potiguara
                </Heading>
              </Flex>
              <Text color={CORES.CINZA_CLARO} fontSize={`${TAMANHO.CORPO_TEXTO}px`}>
                A língua e parte da retomada cultural. No produto artesanal, palavras em tupi potiguara podem
                aproximar nome, origem e significado, ajudando o cliente a conhecer a peça sem apagar sua raiz.
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
