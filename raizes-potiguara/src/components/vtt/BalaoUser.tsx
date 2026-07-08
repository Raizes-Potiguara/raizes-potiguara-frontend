import { CORES, TAMANHO } from "@/util/constants";
import { Box, Image, Text } from "@chakra-ui/react";

export interface BalaoProps {
  msg: string;
  imagemUrl?: string;
  audioUrl?: string;
  carregandoResposta?: boolean;
  carregandoAudio?: boolean;
  erroAudio?: boolean;
}

const BalaoUser = (
  {
    msg,
    imagemUrl,
  }: BalaoProps
) => {
  
  return (
    <Box display="flex" justifyContent="flex-end" mb={2}>
      <Box
        position="relative"
        bg={CORES.VERMELHO_ESCURO}
        color={CORES.CREME}
        px={4}
        py={3}
        borderRadius="2xl"
        maxW="70%"
        _after={{
          content: '""',
          position: "absolute",
          right: "-4px",
          bottom: "10px",
          width: "12px",
          height: "12px",
          bg: CORES.VERMELHO_ESCURO,
          transform: "rotate(45deg)",
          borderRadius: "2px",
        }}
      >
        {imagemUrl && (
          <Image
            src={imagemUrl}
            alt="Imagem enviada"
            w="120px"
            maxW="100%"
            aspectRatio="4 / 3"
            objectFit="cover"
            rounded="lg"
            mb={msg ? 2 : 0}
          />
        )}
        {msg && <Text fontSize={TAMANHO.CORPO_TEXTO}>{msg}</Text>}
      </Box>
    </Box>
  );
};

export default BalaoUser;
