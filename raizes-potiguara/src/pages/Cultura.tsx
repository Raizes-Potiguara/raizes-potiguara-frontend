import HoneycombBackgroundRed from "@/components/general/HoneycombBackgroundRed";
import grafismoCamarao from "@/assets/grafismo-camarao.png";
import grafismoCaminhosMonteMor from "@/assets/grafismo-caminhos-monte-mor.png";
import grafismoCeramicaPotiguara from "@/assets/grafismo-ceramica-potiguara.png";
import grafismoEcologia from "@/assets/grafismo-ecologia.png";
import grafismoTerraFertil from "@/assets/grafismo-terra-fertil.png";
import { CORES, RADIUS_PADRAO_BOTAO, TAMANHO } from "@/util/constants";
import { Box, Container, Flex, Heading, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { BookOpenText, Feather, Gem, Languages, Leaf, Paintbrush, Shell, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

interface BlocoCultural {
  titulo: string;
  descricao: string;
  icon: LucideIcon;
}

interface GrafismoPotiguara {
  nome: string;
  descricao: string;
  significado: string[];
  imagem: string;
}

const simbolos: BlocoCultural[] = [
  {
    titulo: "Memória Visual",
    descricao:
      "Linhas, tramas e marcas visuais ajudam a contar pertencimento, memória e relação com o território.",
    icon: Sparkles,
  },
  {
    titulo: "Conchas e Mar",
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
    titulo: "Cipós e Fibras",
    descricao:
      "Aparecem na cestaria e nos trancados, mostrando paciência, técnica e saber passado entre gerações.",
    icon: Leaf,
  },
  {
    titulo: "Penas e Pigmentos",
    descricao:
      "Quando presentes, conectam cor, rito e identidade, sempre respeitando o sentido cultural de cada uso.",
    icon: Feather,
  },
];

const grafismos: GrafismoPotiguara[] = [
  {
    nome: "Terra Fértil",
    descricao: "Pintura facial",
    significado: ["Terra, fogo, ar e água", "Força da mulher", "Terras férteis"],
    imagem: grafismoTerraFertil,
  },
  {
    nome: "Camarão",
    descricao: "Potiguara, comedores de camarão e caçadores de camarão",
    significado: ["Subsistência dos Potiguara"],
    imagem: grafismoCamarao,
  },
  {
    nome: "Ecologia",
    descricao: "Desmatamento e extrativismo",
    significado: ["Valor ecológico", "Meio ambiente"],
    imagem: grafismoEcologia,
  },
  {
    nome: "Caminhos de Monte-Mór",
    descricao: "Precariedade dos territórios",
    significado: ["Caminhos para educação", "Proteção", "Terra sem males"],
    imagem: grafismoCaminhosMonteMor,
  },
  {
    nome: "Cerâmica Potiguara",
    descricao: "Registro histórico",
    significado: ["Reprodução", "Resistência"],
    imagem: grafismoCeramicaPotiguara,
  },
];

const glossario = [
  {
    palavra: "Raízes",
    significado: "Representa origem, pertencimento, memória e ligação com o território.",
    tupi: "Ybyrá (Apó)",
  },
  {
    palavra: "Colmeia",
    significado: "Representa união, coletividade e trabalho em equipe.",
    tupi: "Eiretama",
  },
  {
    palavra: "Folha de Jurema",
    significado: "Representa proteção espiritual, sabedoria e força.",
    tupi: "Yurema rogwé",
  },
  {
    palavra: "Folha",
    significado: "Representa natureza, cuidado e presença da mata nos símbolos Potiguara.",
    tupi: "Rogwé",
  },
  {
    palavra: "Cobra Coral",
    significado: "Representa sabedoria e prudência.",
    tupi: "Mboikorá",
  },
];

const conceitosCulturais = [
  {
    termo: "Potiguara",
    significado:
      "Povo indígena do litoral norte da Paraíba, com presença marcante em Baía da Traição, Marcação e Rio Tinto.",
  },
  {
    termo: "Grafismo",
    significado:
      "Conjunto de traços, formas e padrões visuais usados para expressar identidade, memória e relação com o território.",
  },
  {
    termo: "Biojoia",
    significado:
      "Adorno produzido com sementes, fibras, conchas, miçangas e outros materiais ligados à natureza e ao trabalho manual.",
  },
  {
    termo: "Cipó",
    significado:
      "Fibra vegetal usada em trançados, amarrações e cestarias, exigindo coleta, preparo e técnica.",
  },
  {
    termo: "Miçanga",
    significado:
      "Pequena conta colorida usada em colares, brincos, pulseiras e bordados, formando desenhos e combinações simbólicas.",
  },
  {
    termo: "Tupi Potiguara",
    significado:
      "Língua ligada à retomada cultural e ao fortalecimento da identidade, presente em nomes, memórias e aprendizagens.",
  },
];

const topicos = [
  "Comercialização justa para reduzir a dependência de atravessadores.",
  "Certificação do artesanato indígena como reconhecimento de origem.",
  "Autonomia econômica das mulheres potiguara e fortalecimento das famílias.",
  "Organização coletiva entre aldeias para preservar renda, memória e técnica.",
];

const Cultura = () => {
  const [grafismoAtivo, setGrafismoAtivo] = useState<string | null>(null);

  const destacarGrafismo = (nome: string) => {
    setGrafismoAtivo(nome);
    window.setTimeout(() => setGrafismoAtivo((atual) => (atual === nome ? null : atual)), 260);
  };

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
              Símbolos e Crenças
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

      <Box as="section" bg={CORES.PRETO} py={{ base: 8, md: 14 }}>
        <Container maxW="container.lg" px={{ base: 5, md: 8 }}>
          <Stack gap={{ base: 6, md: 8 }}>
            <Stack gap={4} maxW="740px">
              <Flex color={CORES.VERMELHO_CLARINHO} align="center" gap={3}>
                <Paintbrush size={28} />
                <Heading as="h2" color={CORES.BRANCO} fontSize={{ base: "22px", md: `${TAMANHO.TITULO_SECAO}px` }}>
                  Grafismos
                </Heading>
              </Flex>
              <Text color={CORES.CINZA_CLARO} fontSize={`${TAMANHO.CORPO_TEXTO}px`}>
                Os grafismos potiguara são linguagens visuais que carregam memória, território, proteção e modos
                de viver. Cada traço comunica um sentido cultural.
              </Text>
            </Stack>

            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={{ base: 4, md: 5 }} justifyItems="center">
              {grafismos.map(({ nome, descricao, significado, imagem }) => {
                const ativo = grafismoAtivo === nome;

                return (
                <Box
                  key={nome}
                  as="button"
                  type="button"
                  onClick={() => destacarGrafismo(nome)}
                  bg={CORES.BRANCO}
                  color={CORES.PRETO}
                  borderRadius="4px"
                  overflow="hidden"
                  aspectRatio="1 / 1"
                  display="flex"
                  flexDirection="column"
                  w="100%"
                  maxW={{ base: "320px", md: "340px" }}
                  border="2px solid transparent"
                  transform={ativo ? "translateY(-10px)" : "none"}
                  transition="transform 0.18s ease"
                  textAlign="left"
                  _hover={{ transform: ativo ? "translateY(-10px)" : "translateY(-3px)" }}
                  _focusVisible={{ outline: `3px solid ${CORES.VERMELHO_CLARINHO}`, outlineOffset: "3px" }}
                >
                  <Flex
                    minH={{ base: "104px", md: "132px" }}
                    align="center"
                    justify="center"
                    bg="transparent"
                    px={{ base: 3, md: 4 }}
                    pt={{ base: 3, md: 4 }}
                  >
                    <Image
                      src={imagem}
                      alt={`Grafismo ${nome}`}
                      w={{ base: "104px", md: "128px" }}
                      h={{ base: "98px", md: "120px" }}
                      objectFit="contain"
                    />
                  </Flex>

                  <Stack gap={{ base: 2, md: 2.5 }} p={{ base: 3, md: 4 }} pt={{ base: 2, md: 3 }} flex="1">
                    <Box>
                      <Text color={CORES.CINZA_ESCURO} fontSize={{ base: "11px", md: `${TAMANHO.TEXTO_PEQUENO}px` }} fontWeight="800">
                        Nome
                      </Text>
                      <Text color={CORES.PRETO} fontWeight="800" fontSize={{ base: "17px", md: "18px" }} lineHeight={1.15}>
                        {nome}
                      </Text>
                    </Box>

                    <Box>
                      <Text color={CORES.CINZA_ESCURO} fontSize={{ base: "11px", md: `${TAMANHO.TEXTO_PEQUENO}px` }} fontWeight="800">
                        Descrição
                      </Text>
                      <Text color={CORES.CINZA_ESCURO} fontSize={{ base: "13px", md: "13px" }} lineHeight={1.2}>
                        {descricao}
                      </Text>
                    </Box>

                    <Box>
                      <Text color={CORES.CINZA_ESCURO} fontSize={{ base: "11px", md: `${TAMANHO.TEXTO_PEQUENO}px` }} fontWeight="800">
                        Significado
                      </Text>
                      <Flex gap={{ base: 1.5, md: 2 }} mt={{ base: 1.5, md: 2 }} wrap="wrap">
                        {significado.map((item) => (
                          <Box key={item} bg={CORES.VERMELHO_CLARINHO} color={CORES.VERMELHO_ESCURO} borderRadius="4px" px={{ base: 2, md: 3 }} py={1}>
                            <Text fontSize={{ base: "12px", md: "12px" }} fontWeight="700" lineHeight={1.2}>
                              {item}
                            </Text>
                          </Box>
                        ))}
                      </Flex>
                    </Box>
                  </Stack>
                </Box>
                );
              })}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      <Box as="section" bg={CORES.CINZA_CLARINHO} py={{ base: 8, md: 14 }}>
        <Container maxW="container.lg" px={{ base: 5, md: 8 }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 10 }} alignItems="start">
            <Stack gap={4}>
              <Heading as="h2" color={CORES.PRETO} fontSize={{ base: "22px", md: `${TAMANHO.TITULO_SECAO}px` }}>
                Materiais e Significados
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
                  Tupi Potiguara
                </Heading>
              </Flex>
              <Text color={CORES.CINZA_CLARO} fontSize={`${TAMANHO.CORPO_TEXTO}px`}>
                A língua é parte da retomada cultural. No produto artesanal, palavras em tupi potiguara podem
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

      <Box as="section" bg={CORES.VERMELHO_ESCURO} py={{ base: 8, md: 14 }}>
        <Container maxW="container.lg" px={{ base: 5, md: 8 }}>
          <Stack gap={3} mb={{ base: 6, md: 8 }}>
            <Heading as="h2" color={CORES.BRANCO} fontSize={{ base: "22px", md: `${TAMANHO.TITULO_SECAO}px` }}>
              Termos e Conceitos
            </Heading>
            <Text color={CORES.CINZA_CLARO} maxW="78ch" fontSize={`${TAMANHO.CORPO_TEXTO}px`}>
              Explore os principais termos, materiais, técnicas e elementos culturais presentes nas peças artesanais. 
              </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
            {conceitosCulturais.map(({ termo, significado }) => (
              <Box key={termo} bg={CORES.BRANCO} borderRadius="4px" p={{ base: 4, md: 5 }}>
                <Text color={CORES.PRETO} fontWeight="800" fontSize={`${TAMANHO.CORPO_TEXTO}px`}>
                  {termo}
                </Text>
                <Text mt={2} color={CORES.CINZA_ESCURO} fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}>
                  {significado}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Box as="section" bg={CORES.BRANCO} py={{ base: 8, md: 14 }}>
        <Container maxW="container.lg" px={{ base: 5, md: 8 }}>
          <Stack gap={3} mb={{ base: 6, md: 8 }}>
            <Flex color={CORES.VERMELHO_ESCURO} align="center" gap={3}>
              <BookOpenText size={28} />
              <Heading as="h2" color={CORES.PRETO} fontSize={{ base: "22px", md: `${TAMANHO.TITULO_SECAO}px` }}>
                Glossário de Palavras em Tupi
              </Heading>
            </Flex>
            <Text color={CORES.CINZA_ESCURO} maxW="68ch" fontSize={`${TAMANHO.CORPO_TEXTO}px`}>
              Palavras, sentidos culturais e traduções em tupi usadas para aproximar o artesanato Potiguara de sua
              memória e de seus símbolos.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            {glossario.map(({ palavra, significado, tupi }) => (
              <Flex
                key={palavra}
                gap={{ base: 3, md: 4 }}
                bg={CORES.CINZA_CLARINHO}
                borderRadius="4px"
                p={{ base: 4, md: 5 }}
                align="flex-start"
              >
                <Box as="span" mt="7px" w="9px" h="9px" borderRadius="full" bg={CORES.VERMELHO_VIVO} flexShrink={0} />
                <Box>
                  <Text color={CORES.CINZA_ESCURO} fontSize={{ base: "11px", md: `${TAMANHO.TEXTO_PEQUENO}px` }} fontWeight="800">
                    Palavra
                  </Text>
                  <Text color={CORES.PRETO} fontWeight="800" fontSize={`${TAMANHO.CORPO_TEXTO}px`}>
                    {palavra}
                  </Text>

                  <Text mt={3} color={CORES.CINZA_ESCURO} fontSize={{ base: "11px", md: `${TAMANHO.TEXTO_PEQUENO}px` }} fontWeight="800">
                    Significado
                  </Text>
                  <Text mt={1} color={CORES.CINZA_ESCURO} fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}>
                    {significado}
                  </Text>

                  <Text mt={3} color={CORES.CINZA_ESCURO} fontSize={{ base: "11px", md: `${TAMANHO.TEXTO_PEQUENO}px` }} fontWeight="800">
                    Tradução em Tupi
                  </Text>
                  <Text mt={1} color={CORES.VERMELHO_ESCURO} fontWeight="800" fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}>
                    {tupi}
                  </Text>
                </Box>
              </Flex>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};

export default Cultura;
