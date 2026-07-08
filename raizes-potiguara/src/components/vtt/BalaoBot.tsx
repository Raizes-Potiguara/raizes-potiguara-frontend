import { CORES, TAMANHO } from "@/util/constants";
import { Box, Button, IconButton, Spinner, Text } from "@chakra-ui/react";
import { Volume2 } from "lucide-react";
import { useRef, useState } from "react";
import type { BalaoProps } from "./BalaoUser";

const BalaoBot = (
  {
    msg,
    audioUrl,
    carregandoResposta,
    carregandoAudio,
    erroAudio,
    audioStatus,
    audioErro,
  }: BalaoProps
) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [mostrarTranscricao, setMostrarTranscricao] = useState(false);
  const [estadoPlay, setEstadoPlay] = useState<"parado" | "tocando" | "erro">("parado");

  console.log("[BalaoBot] audioUrl recebido:", audioUrl);

  const tocarAudio = async () => {
    if (!audioUrl) return;

    console.log("[TTS] tentando tocar:", audioUrl);
    const audio = audioRef.current;
    if (audio) {
      try {
        setEstadoPlay("tocando");
        audio.src = audioUrl;
        audio.currentTime = 0;
        audio.load();
        await audio.play();
        return;
      } catch (error) {
        console.error("[TTS] erro ao tocar áudio:", error);
      }
    }

    try {
      setEstadoPlay("tocando");
      const audioDireto = new Audio(audioUrl);
      audioDireto.preload = "auto";
      await audioDireto.play();
    } catch (error) {
      setEstadoPlay("erro");
      console.error("[TTS] erro ao tocar áudio:", error);
    }
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
        {carregandoResposta ? (
          <Box display="flex" alignItems="center" gap={2}>
            <Spinner size="sm" />
            <Text fontSize={TAMANHO.TEXTO_PEQUENO}>Preparando resposta...</Text>
          </Box>
        ) : audioUrl ? (
          <Box display="flex" flexDir="column" alignItems="flex-start" gap={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <audio
                ref={audioRef}
                src={audioUrl}
                preload="auto"
                onEnded={() => setEstadoPlay("parado")}
                onPause={() => setEstadoPlay("parado")}
                onError={(event) => {
                  setEstadoPlay("erro");
                  console.error("[TTS] erro no elemento audio:", event);
                }}
              />
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
            <Text fontSize={TAMANHO.TEXTO_PEQUENO} color={estadoPlay === "erro" ? CORES.VERMELHO_CLARINHO : CORES.CINZA_CLARO}>
              {estadoPlay === "tocando"
                ? "Reproduzindo..."
                : estadoPlay === "erro"
                  ? "Não foi possível tocar."
                  : audioStatus === "pronto"
                    ? "Áudio pronto."
                    : ""}
            </Text>
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
        ) : erroAudio ? (
          <Box display="flex" flexDir="column" gap={2}>
            <Text fontSize={TAMANHO.TEXTO_PEQUENO} color={CORES.CINZA_CLARO}>
              {audioErro || "Não foi possível gerar áudio agora."}
            </Text>
            <Text fontSize={TAMANHO.CORPO_TEXTO}>{msg}</Text>
          </Box>
        ) : (
          <Text fontSize={TAMANHO.CORPO_TEXTO}>{msg}</Text>
        )}
      </Box>
    </Box>
  );
};

export default BalaoBot;
