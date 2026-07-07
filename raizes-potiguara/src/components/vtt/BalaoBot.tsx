import { CORES, TAMANHO } from "@/util/constants";
import { Box, Button, IconButton, Spinner, Text } from "@chakra-ui/react";
import { Volume2 } from "lucide-react";
import { useRef, useState } from "react";
import type { BalaoProps } from "./BalaoUser";

const BalaoBot = (
  {
    msg,
    audioUrl,
    carregandoAudio,
    erroAudio,
  }: BalaoProps
) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [mostrarTranscricao, setMostrarTranscricao] = useState(false);

  const tocarAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    void audio.play();
  };

  return (
    <Box display="flex" justifyContent="flex-start" mb={2}>
      <Box
        position="relative"
        bg={CORES.CINZA_ESCURO}
        color={CORES.CREME}
        px={4}
        py={3}
        borderRadius="2xl"
        maxW="70%"
        _after={{
          content: '""',
          position: "absolute",
          left: "-4px",
          bottom: "10px",
          width: "12px",
          height: "12px",
          bg: `${CORES.CINZA_ESCURO}`,
          transform: "rotate(45deg)",
          borderRadius: "2px",
        }}
      >
        {audioUrl ? (
          <Box display="flex" flexDir="column" alignItems="flex-start" gap={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <audio ref={audioRef} src={audioUrl} preload="auto" />
              <IconButton
                aria-label="Ouvir resposta"
                rounded="full"
                size="lg"
                color={CORES.CINZA_ESCURO}
                bg={CORES.CREME}
                onClick={tocarAudio}
              >
                <Volume2 size={22} />
              </IconButton>
            </Box>
            <Button
              size="xs"
              variant="ghost"
              color={CORES.CREME}
              px={0}
              h="auto"
              minH={0}
              fontSize={TAMANHO.TEXTO_PEQUENO}
              onClick={() => setMostrarTranscricao((valor) => !valor)}
            >
              {mostrarTranscricao ? "Ocultar transcrição" : "Ver transcrição"}
            </Button>
            {mostrarTranscricao && (
              <Text fontSize={TAMANHO.TEXTO_PEQUENO} lineHeight={1.35}>
                {msg}
              </Text>
            )}
          </Box>
        ) : carregandoAudio ? (
          <Box display="flex" alignItems="center" gap={2}>
            <Spinner size="sm" />
            <Text fontSize={TAMANHO.TEXTO_PEQUENO}>Preparando áudio...</Text>
          </Box>
        ) : (
          <Text fontSize={erroAudio ? TAMANHO.TEXTO_PEQUENO : TAMANHO.CORPO_TEXTO}>
            {erroAudio ? "Não foi possível gerar áudio agora." : msg}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default BalaoBot;
