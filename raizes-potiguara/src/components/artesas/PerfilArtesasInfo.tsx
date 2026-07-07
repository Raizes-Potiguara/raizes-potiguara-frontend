import { Badge, Box, Flex, Image, Text } from "@chakra-ui/react";
import { AtSign, Mail, MapPin } from "lucide-react";
import { CORES, RADIUS_PADRAO_BOTAO, TAMANHO } from "@/util/constants";

export interface RedeSocialArtesa {
  tipo: "instagram" | "email";
  url: string;
}

export interface PerfilArtesaProps {
  nome: string;
  aldeia: string;
  historia: string;
  producao: string;
  materiais: string[];
  foto: string;
  ajustarFoto?: boolean;
  redesSociais?: RedeSocialArtesa[];
  inverterLado?: boolean;
}

const ICONE_REDE_SOCIAL = {
  instagram: AtSign,
  email: Mail,
} as const;

const PerfilArtesa = ({
  nome,
  aldeia,
  historia,
  producao,
  materiais,
  foto,
  ajustarFoto = false,
  redesSociais = [],
  inverterLado = false,
}: PerfilArtesaProps) => {
  const lado = inverterLado ? "right" : "left";

  return (
    <Box mb={{ base: 12, md: 16 }} css={{ display: "flow-root" }}>
      <Box
        float={lado}
        w={{ base: "130px", md: "210px" }}
        mr={{ base: 4, md: inverterLado ? 0 : 8 }}
        ml={{ base: 4, md: inverterLado ? 8 : 0 }}
        mb={4}
      >
        <Box
          borderRadius="full"
          overflow="hidden"
          aspectRatio="1 / 1"
          bg={CORES.PRETO}
          boxShadow={`5px 5px 0 ${CORES.VERMELHO_ESCURO}`}
          position="relative"
        >
          {ajustarFoto ? (
            <>
              <Image
                src={foto}
                alt=""
                position="absolute"
                inset={0}
                w="100%"
                h="100%"
                objectFit="cover"
                filter="blur(10px)"
                transform="scale(1.08)"
                opacity={0.45}
              />
              <Image
                src={foto}
                alt={nome}
                position="relative"
                zIndex={1}
                w="100%"
                h="100%"
                objectFit="contain"
              />
            </>
          ) : (
            <Image src={foto} alt={nome} w="100%" h="100%" objectFit="cover" />
          )}
        </Box>

        {/* etiqueta torta com o nome, "pendurada" na base da foto */}
        <Flex justify="center" mt={-4} position="relative" zIndex={1}>
          <Flex
            bg={CORES.CINZA_CLARINHO}
            border={`2px solid ${CORES.PRETO}`}
            borderRadius={`${RADIUS_PADRAO_BOTAO}px`}
            maxW="92%"
            px={3}
            py={1}
            transform="rotate(-4deg)"
            boxShadow="2px 3px 0 rgba(0,0,0,.2)"
          >
            <Text
              fontWeight="800"
              color={CORES.VERMELHO_VIVO}
              fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}
              textAlign="center"
              lineHeight={1.2}
            >
              {nome}
            </Text>
          </Flex>
        </Flex>
      </Box>

      <Flex align="center" gap={2} mb={2} color={CORES.CINZA_CLARINHO}>
        <MapPin size={16} />
        <Text fontSize={`${TAMANHO.TEXTO_PEQUENO}px`} fontWeight="700">
          {aldeia}
        </Text>
      </Flex>

      <Text color={CORES.CINZA_CLARINHO} fontSize={`${TAMANHO.CORPO_TEXTO}px`} mb={4}>
        {historia}
      </Text>

      <Text color={CORES.BRANCO} fontSize={`${TAMANHO.CORPO_TEXTO}px`} fontWeight="800" mb={3}>
        Produz: {producao}.
      </Text>

      <Flex gap={2} wrap="wrap" mb={4}>
        {materiais.map((material) => (
          <Badge key={material} bg={CORES.VERMELHO_CLARINHO} color={CORES.VERMELHO_ESCURO}>
            {material}
          </Badge>
        ))}
      </Flex>

      {/* espaço reservado para redes sociais; sem link cadastrado, some como placeholder desativado */}
      <Flex gap={3}>
        {(["instagram", "email"] as const).map((tipo) => {
          const rede = redesSociais.find((r) => r.tipo === tipo);
          const Icone = ICONE_REDE_SOCIAL[tipo];

          return (
            <Flex
              key={tipo}
              asChild
              align="center"
              justify="center"
              w="36px"
              h="36px"
              borderRadius="full"
              border={`2px solid ${CORES.CINZA_CLARO}`}
              color={rede ? CORES.BRANCO : CORES.CINZA_CLARO}
              opacity={rede ? 1 : 0.45}
              pointerEvents={rede ? "auto" : "none"}
              _hover={rede ? { borderColor: CORES.VERMELHO_VIVO, color: CORES.VERMELHO_VIVO } : undefined}
            >
              <a
                href={rede?.url ?? "#"}
                target={rede && tipo === "instagram" ? "_blank" : undefined}
                rel={rede ? "noreferrer" : undefined}
                aria-label={tipo === "instagram" ? `Instagram de ${nome}` : `E-mail de ${nome}`}
              >
                <Icone size={18} />
              </a>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};

export default PerfilArtesa;
