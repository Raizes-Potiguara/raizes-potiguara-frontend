import { useState } from "react";
import {
  Textarea,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { Mic, SendHorizonal } from "lucide-react";
import { CORES, RADIUS_PADRAO_BOTAO, RADIUS_PADRAO_CARD, TAMANHO } from "@/util/constants";

const Inputs = () => {
  const [mensagem, setMensagem] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const isEmpty = mensagem.trim().length === 0;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMensagem(e.target.value);
  };

  return (
    <Flex px={2} gap={4} align="center">
      <Textarea
        value={isRecording ? "Gravando..." : mensagem}
        onChange={handleChange}
        fontSize={TAMANHO.TEXTO_PEQUENO}
        placeholder="Digite ou fale aqui..."
        bg={CORES.CREME+"/5"}
        borderRadius={RADIUS_PADRAO_CARD}
        resize="none"
        maxH="16vh"
        overflowY="auto"
        border={"none"}
        disabled={isRecording}
        cursor={isRecording ? "not-allowed" : "text"}
        alignContent={"center"}
        onInput={(e) => {
          const el = e.currentTarget;
          el.style.height = "auto";
          el.style.height = Math.min(el.scrollHeight, 200) + "px";
        }}
      />

      <IconButton
        rounded="full"
        size={"xl"}
        aria-label={isEmpty ? "Usar microfone" : "Enviar mensagem"}
        bgColor={CORES.VERMELHO_MEDIO}
        color={CORES.BRANCO}
        transform={isRecording ? "scale(1.2)" : "scale(1)"}
        transition="all 0.2s ease"
        animation={isRecording ?"pulse":"none"}
        onMouseDown={() => isEmpty && setIsRecording(true)}
        onMouseUp={() => setIsRecording(false)}
        onMouseLeave={() => setIsRecording(false)}
        onTouchStart={() => isEmpty && setIsRecording(true)}
        onTouchEnd={() => setIsRecording(false)}
      >
        {isEmpty ? <Mic /> : <SendHorizonal />}
      </IconButton>
    </Flex>
  );
};

export default Inputs;